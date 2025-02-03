import { MailService } from '@hedhog/mail';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from 'hcode-core';
import { getBody } from './consts/body';
import { SUBJECT_RECOVERY } from './consts/subject';
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { SignupDTO } from './dto/signup.dto';
import { MultifactorType } from './enums/multifactor-type.enum';

@Injectable()
export class AuthService {
  constructor(
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
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
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
          subject: 'Login code',
          body: `Your login code is ${code}`,
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
      name: user.name,
      email: user.email,
      token: this.jwt.sign(payload),
    };
  }

  async forget({
    email,
    subject,
    body,
  }: ForgetDTO & {
    subject?: string;
    body?: string;
  }) {
    const user = await this.prisma.user.findFirst({
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
      subject: subject ?? SUBJECT_RECOVERY,
      body:
        body ??
        getBody(`${process.env.FRONTEND_URL}/password-recovery/${code}`),
    });

    return true;
  }

  async resetPassword({
    code,
    newPassword,
    confirmNewPassword,
  }: {
    code: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const { id } = this.jwt.decode(code) as User;

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
      throw new NotFoundException('Invalid code');
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

  login({ email, password }: LoginDTO) {
    return this.loginWithEmailAndPassword(email, password);
  }

  verify(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async signup({
    fullName,
    cpf,
    telephone,
    city,
    district,
    postal_code,
    state,
    street,
    number,
    email,
    password,
  }: SignupDTO) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: fullName,
      },
    });

    const personType = await this.prisma.person_type.findFirst({
      where: {
        slug: 'physical',
      },
    });

    const person = await this.prisma.person.create({
      data: {
        name: fullName,
        photo_id: null,
        birth_at: null,
        type_id: personType.id,
      },
    });

    const country = await this.prisma.country.findFirst({
      where: {
        code: 'BRA',
      },
    });

    if (street) {
      const addressType = await this.prisma.person_address_type.findFirst({
        where: {
          slug: 'residential',
        },
      });

      await this.prisma.person_address.create({
        data: {
          street,
          number,
          district,
          city,
          state,
          postal_code,
          person_address_type: {
            connect: {
              id: addressType.id,
            },
          },
          country: {
            connect: {
              id: country.id,
            },
          },
          person: {
            connect: {
              id: person.id,
            },
          },
        },
      });
    }

    if (telephone) {
      const contactType = await this.prisma.person_contact_type.findFirst({
        where: {
          slug: 'phone',
        },
      });

      await this.prisma.person_contact.create({
        data: {
          value: String(telephone),
          person: {
            connect: {
              id: person.id,
            },
          },
          person_contact_type: {
            connect: {
              id: contactType.id,
            },
          },
        },
      });
    }

    if (cpf) {
      const documentType = await this.prisma.person_document_type.findFirst({
        where: {
          slug: 'cpf',
        },
      });

      await this.prisma.person_document.create({
        data: {
          value: String(cpf),
          person: {
            connect: {
              id: person.id,
            },
          },
          person_document_type: {
            connect: {
              id: documentType.id,
            },
          },
          country: {
            connect: {
              id: country.id,
            },
          },
        },
      });
    }

    return this.getToken(user);
  }
}
