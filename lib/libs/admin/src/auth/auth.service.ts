import { MailService as MailManagerService } from '@hedhog/mail-manager';
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
import { randomBytes } from 'crypto';
import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';
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
  public settings: Record<string, any> = {};

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwt: JwtService,
    @Inject(forwardRef(() => MailManagerService))
    private readonly mail: MailManagerService,
    @Inject(forwardRef(() => SettingService))
    private readonly setting: SettingService,
  ) {}

  async onModuleInit() {
    this.settings = await this.setting.getSettingValues([
      'mfa-issuer',
      'mfa-window',
      'mfa-setp',
      'system-name',
      'google_client_id',
      'google_client_secret',
      'google_scopes',
      'url',
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

  async getPasswordHashed(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
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

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: await this.getPasswordHashed(password),
        multifactor_id,
        code,
      },
    });

    return this.getToken(newUser);
  }

  async createUser(
    locale: string,
    {
      code,
      password,
      street,
      number,
      complement,
      district,
      city,
      state,
      postal_code,
    }: CreateUserDTO,
  ) {
    try {
      const user = await this.createUserCheck(code);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: await this.getPasswordHashed(password),
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

      await this.mail.sendTemplatedMail(locale, {
        email: user.email,
        slug: 'create-user',
        variables: {},
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

  generateRandomPassword(length = 12) {
    return randomBytes(length).toString('base64').slice(0, length);
  }

  async loginWithEmailAndPassword(
    locale: string,
    email: string,
    password: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password: {
          notIn: [''],
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Acesso negado');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Acesso negado');
    }

    return this.userMfaSteps(user, locale);
  }

  async userMfaSteps(user, locale = 'pt') {
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

          await this.mail.sendTemplatedMail(locale, {
            email: user.email,
            slug: 'login',
            variables: { code: String(code) },
          });

          return {
            token: this.jwt.sign({
              id: user.id,
              mfa: user.multifactor_id,
            }),
            mfa: true,
            multifactor_id: user.multifactor_id,
          };
        case MultifactorType.APP:
          return {
            token: this.jwt.sign({
              id: user.id,
              mfa: user.multifactor_id,
            }),
            mfa: true,
            multifactor_id: user.multifactor_id,
          };
      }
    }
  }

  async getToken(user) {
    delete user.password;

    const payload = { user };

    return {
      token: this.jwt.sign(payload),
      mfa: false,
    };
  }

  async forget(locale: string, { email }: ForgetDTO) {
    const appUrl =
      process.env.APP_URL ??
      process.env.FRONTEND_URL ??
      this.configService.get<string>('APP_URL');

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

      await this.mail.sendTemplatedMail(locale, {
        email,
        slug: 'forget-password',
        variables: {
          appUrl,
          code,
        },
      });
    }

    return {
      message:
        'Se este e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
    };
  }

  async changePassword(
    locale: string,
    { email, currentPassword, newPassword, confirmNewPassword }: ChangeDTO,
  ) {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Senhas não conferem');
    }

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!(await compare(currentPassword, user.password))) {
      throw new NotFoundException('Não foi possível alterar a senha.');
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await this.getPasswordHashed(newPassword),
      },
    });

    await this.mail.sendTemplatedMail(locale, {
      email,
      slug: 'change-password',
      variables: {},
    });

    return this.getToken(newUser);
  }

  async changeEmail(
    locale: string,
    { currentEmail, password, newEmail }: EmailDTO,
  ) {
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

    await this.mail.sendTemplatedMail(locale, {
      email: newEmail,
      slug: 'change-email',
      variables: {},
    });

    return this.getToken(newUser);
  }

  async resetPassword(
    locale: string,
    { code, newPassword, confirmNewPassword }: ResetDTO,
  ) {
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
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: await this.getPasswordHashed(confirmNewPassword),
            code: null,
          },
        });

        await this.mail.sendTemplatedMail(locale, {
          email: user.email,
          slug: 'reset-password',
          variables: {},
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

  async checkCodeMfa(userId: number, code: string) {
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

  async loginRecoveryCode({ token, code }: LoginWithCodeDTO) {
    const data = this.jwt.decode(token);

    if (!data?.mfa || !data?.id) {
      throw new BadRequestException('Código inválido');
    }

    switch (data.mfa) {
      case MultifactorType.EMAIL:
      case MultifactorType.APP:
        const codes = await this.prisma.user_code_recovery.findMany({
          where: {
            user_id: data.id,
          },
        });

        let isValid = false;

        for (const item of codes) {
          const isCodeValid = await compare(String(code), item.code);

          if (isCodeValid) {
            isValid = true;
            await this.prisma.user_code_recovery.delete({
              where: {
                id: item.id,
              },
            });
            break;
          }
        }

        if (!isValid) {
          throw new NotFoundException('Código inválido');
        }

        const user = await this.prisma.user.findFirst({
          where: {
            id: data.id,
          },
        });

        return this.getToken(user);
    }
  }

  async loginCode({ token, code }: LoginWithCodeDTO) {
    const data = this.jwt.decode(token);

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

  async login(locale: string, { email, password }: LoginDTO) {
    return this.loginWithEmailAndPassword(locale, email, password);
  }

  async verify(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async generateMfa(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        email: true,
        multifactor_id: true,
      },
    });

    if (user.multifactor_id) {
      throw new ConflictException('Usuário já possui MFA habilitado');
    }

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
        code: secret.base32,
      },
    });

    return { otpauthUrl: secret.otpauth_url, qrCode };
  }

  generateRecoveryCodes(count = 10): string[] {
    const codes = Array.from({ length: count }, () => {
      const array = new Uint8Array(4);
      globalThis.crypto.getRandomValues(array);
      return Array.from(array)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    });
    return codes;
  }

  async createMfaRecoveryCodes(userId: number) {
    const codes = this.generateRecoveryCodes();

    await this.prisma.user_code_recovery.deleteMany({
      where: {
        user_id: userId,
      },
    });

    const salt = await genSalt();

    const data = [];

    for (const code of codes) {
      const hashCode = await hash(code, salt);

      data.push({
        user_id: userId,
        code: hashCode,
      });
    }

    await this.prisma.user_code_recovery.createMany({
      data,
    });

    return codes;
  }

  async removeMfa(userId: number, token: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      await this.verifyMfa(user.email, token, false);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          multifactor_id: null,
          code: null,
        },
      });

      return this.getToken(updatedUser);
    } catch (error: any) {
      throw new BadRequestException(`Invalid code: ${error?.message}`);
    }
  }

  async verifyMfa(
    email: string,
    token: string,
    verifyMultifactor: boolean = true,
  ) {
    const window = this.settings['mfa-window'] ?? 0;
    const step = this.settings['mfa-setp'] ?? 30;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (verifyMultifactor && user.multifactor_id) {
      throw new ConflictException('Usuário já possui MFA habilitado');
    }

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

    const updatedUser = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        multifactor_id: MultifactorType.APP,
      },
    });

    const codes = await this.createMfaRecoveryCodes(updatedUser.id);
    const newToken = await this.getToken(updatedUser);

    return { ...newToken, codes };
  }
}
