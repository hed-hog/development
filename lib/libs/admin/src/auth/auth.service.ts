import { MailService } from '@hedhog/mail';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { getBody } from './consts/body';
import { ChangeDTO } from './dto/change.dto';
import { EmailDTO } from './dto/email.dto';
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { ResetDTO } from './dto/reset.dto';
import { MultifactorType } from './enums/multifactor-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwt: JwtService,
    @Inject(forwardRef(() => MailService))
    private readonly mail: MailService,
  ) {}

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

    if (!user.multifactor_id) {
      return this.getToken(user);
    } else {
      if (user.multifactor_id === MultifactorType.EMAIL) {
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
      }

      return {
        name: user.name,
        email: user.email,
        token: this.jwt.sign({
          id: user.id,
          mfa: user.multifactor_id,
        }),
        mfa: true,
      };
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
        body: getBody(`${appUrl}/login?mode=reset-password&code=${code}`),
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

    return this.getToken(newUser);
  }

  async changeEmail({ currentEmail, password, newEmail }: EmailDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email: currentEmail },
    });

    if (!user) {
      throw new BadRequestException('Não foi possível atualizar o e-mail.');
    }

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Não foi possível atualizar o e-mail.');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: { email: newEmail },
    });

    if (existingUser) {
      throw new ConflictException('Não foi possível atualizar o e-mail.');
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

    return this.getToken(newUser);
  }

  async resetPassword({ code, newPassword, confirmNewPassword }: ResetDTO) {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Senhas não conferem');
    }

    try {
      const decodedCode = this.jwt.decode(code);

      console.log({ decodedCode });

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

        return this.getToken(user);
      }

      return false;
    } catch (error: any) {
      throw new BadRequestException(
        `Invalid code. ${error?.message ?? String(error)}`,
      );
    }
  }

  async otp({ token, code }: OtpDTO) {
    const data = this.jwt.decode(token);

    const user = await this.prisma.user.findFirst({
      where: {
        id: data['id'],
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
  }

  async login({ email, password }: LoginDTO) {
    return this.loginWithEmailAndPassword(email, password);
  }

  async verify(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
