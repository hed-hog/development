import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { ForgetDTO } from './dto/forget.dto';
import { PrismaService } from '@hedhog/prisma';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MultifactorType } from './enums/multifactor-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
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
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    if (!user.multifactor_id) {
      return this.getToken(user);
    } else {
      if (user.multifactor_id === MultifactorType.EMAIL) {
        const code = this.generateRandomNumber();

        await this.prisma.users.update({
          where: {
            id: user.id,
          },
          data: {
            code: String(code),
          },
        });

        //Send email...
      }

      return {
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
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const code = this.generateRandomString(32);

    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        code,
      },
    });

    //Send email...

    return true;
  }

  async otp({ token, code }: OtpDTO) {
    const data = this.jwt.decode(token);

    const user = await this.prisma.users.findFirst({
      where: {
        id: data['id'],
        code: String(code),
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid code');
    }

    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        code: null,
      },
    });

    return this.getToken(user);
  }

  login({ email, password }: LoginDTO) {
    return this.loginWithEmailAndPassword(email, password);
  }

  verify(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }
}
