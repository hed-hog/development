import { MailService } from '@hedhog/mail';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';
import {
  getChangeEmailEmail,
  getChangePasswordEmail,
  getCreateUserEmail,
  getForgetPasswordEmail,
  getResetPasswordEmail,
} from '../emails';
import { SettingService } from '../setting/setting.service';
import { ChangeDTO } from './dto/change.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailDTO } from './dto/email.dto';
import { ForgetDTO } from './dto/forget.dto';
import { LoginWithCodeDTO } from './dto/login-with-code.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResetDTO } from './dto/reset.dto';
import { MultifactorType } from './enums/multifactor-type.enum';

@Injectable()
export class AuthService implements OnModuleInit {
  private settings: Record<string, any> = {};

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwt: JwtService,
    @Inject(forwardRef(() => MailService))
    private readonly mail: MailService,
    @Inject(forwardRef(() => SettingService))
    private readonly setting: SettingService,
  ) {}

  async onModuleInit() {
    this.settings = await this.setting.getSettingValues([
      'mfa-issuer',
      'mfa-window',
      'mfa-setp',
      'system-name',
    ]);
  }

  async createUserCheck(code: string) {
    try {
      await this.verifyToken(code);
    } catch (error: any) {
      throw new BadRequestException(`Invalid code: ${error?.message}`);
    }

    const user = await this.prisma.user.findFirst({
      where: {
        code,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid code or user not found');
    }

    return user;
  }

  async register({ email, name, password, code, multifactor_id }: RegisterDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('Already exists a user with this email');
    }

    const salt = await genSalt();
    password = await hash(password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        multifactor_id,
        code,
      },
    });

    return this.getToken(newUser);
  }

  async createUser({
    code,
    password,
    street,
    number,
    complement,
    district,
    city,
    state,
    postal_code,
  }: CreateUserDTO) {
    try {
      const user = await this.createUserCheck(code);
      const salt = await genSalt();
      password = await hash(password, salt);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password,
          code: null,
        },
      });

      const { person_id } = await this.prisma.person_user.findFirst({
        where: {
          user_id: user.id,
        },
      });

      const country = await this.prisma.country.findFirst({
        where: { code: 'BRA' },
      });

      const address = await this.prisma.person_address.findFirst({
        where: {
          person_id,
        },
      });

      if (!address) {
        await this.prisma.person_address.create({
          data: {
            street,
            number,
            complement,
            district,
            city,
            state,
            postal_code,
            country_id: country.id,
            type_id: 1,
            person_id: person_id,
          },
        });
      } else {
        await this.prisma.person_address.update({
          where: {
            id: address.id,
          },
          data: {
            street,
            number,
            complement,
            district,
            city,
            state,
            postal_code,
            country_id: country.id,
          },
        });
      }

      await this.mail.send({
        to: user.email,
        subject: 'Conta criada',
        body: getCreateUserEmail({
          name: user.name,
        }),
      });

      return this.getToken(user);
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }

  async verifyToken(token: string) {
    return this.jwt.verifyAsync(token, {
      secret: String(process.env.JWT_SECRET),
    });
  }

  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  generateRandomNumber(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('Acesso negado');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Acesso negado');
    }

    console.log('loginWithEmailAndPassword', { user });

    if (!user.multifactor_id) {
      return this.getToken(user);
    } else {
      switch (user.multifactor_id) {
        case MultifactorType.EMAIL:
          const code = this.generateRandomNumber();

          await this.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              code: String(code),
            },
          });

          await this.mail.send({
            to: user.email,
            subject: 'Código de Login',
            body: `Seu código de login é ${code}`,
          });

          return {
            token: this.jwt.sign({
              id: user.id,
              mfa: user.multifactor_id,
            }),
            mfa: true,
          };
        case MultifactorType.APP:
          return {
            token: this.jwt.sign({
              id: user.id,
              mfa: user.multifactor_id,
            }),
            mfa: true,
          };
      }
    }
  }

  async getToken(user) {
    delete user.password;

    const payload = { user };

    return {
      token: this.jwt.sign(payload),
    };
  }

  async forget({ email }: ForgetDTO) {
    const appUrl =
      process.env.APP_URL ?? this.configService.get<string>('APP_URL');

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      const payload = {
        ...user,
      };

      const code = this.jwt.sign(payload);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          code,
        },
      });

      await this.mail.send({
        to: email,
        subject: `Recuperação de Senha`,
        body: getForgetPasswordEmail(`${appUrl}/home?reset&code=${code}`),
      });
    }

    return {
      message:
        'Se este e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
    };
  }

  async changePassword({
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: ChangeDTO) {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Senhas não conferem');
    }

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!(await compare(currentPassword, user.password))) {
      throw new NotFoundException('Não foi possível alterar a senha.');
    }

    const salt = await genSalt();
    const password = await hash(newPassword, salt);

    const newUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
      },
    });

    await this.mail.send({
      to: email,
      subject: `Senha alterada`,
      body: getChangePasswordEmail(),
    });

    return this.getToken(newUser);
  }

  async changeEmail({ currentEmail, password, newEmail }: EmailDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email: currentEmail },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Senha inválida.');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: { email: newEmail },
    });

    if (existingUser) {
      throw new ConflictException('Já existe um usuário com esse e-mail.');
    }

    const newUser = await this.prisma.user.updateMany({
      where: { email: currentEmail },
      data: { email: newEmail },
    });

    const personUser = await this.prisma.person_user.findFirst({
      where: { user_id: user.id },
      select: { person_id: true },
    });

    if (!personUser) {
      throw new NotFoundException('Erro ao atualizar os dados do usuário.');
    }

    const { id: emailContactTypeId } =
      await this.prisma.person_contact_type.findFirst({
        where: { slug: 'EMAIL' },
      });

    await this.prisma.person_contact.updateMany({
      where: {
        person_id: personUser.person_id,
        type_id: emailContactTypeId,
      },
      data: { value: newEmail },
    });

    await this.mail.send({
      to: newEmail,
      subject: `Email alterado`,
      body: getChangeEmailEmail(),
    });

    return this.getToken(newUser);
  }

  async resetPassword({ code, newPassword, confirmNewPassword }: ResetDTO) {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Senhas não conferem');
    }

    try {
      const decodedCode = this.jwt.decode(code);

      const { id } = decodedCode;

      const user = await this.prisma.user.findFirst({
        where: {
          id,
          code,
        },
      });

      if (user) {
        const salt = await genSalt();
        const password = await hash(confirmNewPassword, salt);

        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            password,
            code: null,
          },
        });

        await this.mail.send({
          to: user.email,
          subject: `Senha recuperada`,
          body: getResetPasswordEmail(),
        });

        return this.getToken(user);
      }

      return false;
    } catch (error: any) {
      throw new BadRequestException(
        `Invalid code. ${error?.message ?? String(error)}`,
      );
    }
  }

  async checkCodeMfa(userId: number, code: number) {
    const window = this.settings['mfa-window'] ?? 0;
    const step = this.settings['mfa-setp'] ?? 30;

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        code: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isValid = await speakeasy.totp.verify({
      secret: user.code,
      encoding: 'base32',
      token: String(code),
      window,
      step,
    });

    return isValid;
  }

  async loginCode({ token, code }: LoginWithCodeDTO) {
    const data = this.jwt.decode(token);

    console.log('loginCode', { data });

    if (!data?.mfa || !data?.id) {
      throw new BadRequestException('Código inválido');
    }

    switch (data.mfa) {
      case MultifactorType.EMAIL:
        const user = await this.prisma.user.findFirst({
          where: {
            id: data.id,
            code: String(code),
          },
        });

        if (!user) {
          throw new NotFoundException('Código inválido');
        }

        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            code: null,
          },
        });

        return this.getToken(user);
      case MultifactorType.APP:
        const isValid = await this.checkCodeMfa(data.id, code);

        if (!isValid) {
          throw new NotFoundException('Código inválido');
        }

        const userApp = await this.prisma.user.findFirst({
          where: {
            id: data.id,
          },
        });

        if (!userApp) {
          throw new NotFoundException('Código inválido');
        }

        return this.getToken(userApp);
    }
  }

  async login({ email, password }: LoginDTO) {
    return this.loginWithEmailAndPassword(email, password);
  }

  async verify(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async generate2fa(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    const issuer = this.settings['mfa-issuer'] ?? 'Hedhog';

    const appName = `${issuer} (${user.email})`;

    const secret = speakeasy.generateSecret({
      name: appName,
      otpauth: {
        label: appName,
        issuer,
      },
      encoding: 'base32',
    });

    const otpauth = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${issuer}:${user.email}`,
      issuer,
      encoding: 'base32',
    });

    const qrCode = await qrcode.toDataURL(otpauth);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        multifactor_id: MultifactorType.APP,
        code: secret.base32,
      },
    });

    return { qrCode, otpauthUrl: secret.otpauth_url };
  }

  async create2faRecoveryCodes(userId: number) {}

  async verify2fa(userId: number, token: string) {
    const window = this.settings['mfa-window'] ?? 0;
    const step = this.settings['mfa-setp'] ?? 30;

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isValid = await speakeasy.totp.verify({
      secret: user.code,
      encoding: 'base32',
      token,
      window,
      step,
    });

    if (!isValid) {
      throw new BadRequestException('Código inválido');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        multifactor_id: MultifactorType.APP,
        code: user.code,
      },
    });

    return this.getToken(user);
  }
}
