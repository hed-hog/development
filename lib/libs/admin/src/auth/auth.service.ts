import { MailService } from '@hedhog/mail';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from 'hcode-core';
import { getBody } from './consts/body';
import { SUBJECT_RECOVERY } from './consts/subject';
import { ChangeDTO } from './dto/change.dto';
import { EmailDTO } from './dto/email.dto';
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { ResetDTO } from './dto/reset.dto';
import { SignupDTO } from './dto/signup.dto';
import { UpdateUserDataDTO } from './dto/update.dto';
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

    const userData: any = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        person_user: {
          include: {
            person: {
              include: {
                person_address: {
                  include: {
                    country: true,
                    person_address_type: true,
                  },
                },
                person_contact: {
                  include: {
                    person_contact_type: true,
                  },
                },
                person_document: {
                  include: {
                    person_document_type: true,
                    country: true,
                  },
                },
                person_type: true,
              },
            },
          },
        },
      },
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const person = userData.person_user?.[0]?.person;

    const payload = { user: userData };

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      cpf:
        person?.person_document?.find(
          (doc) => doc.person_document_type.slug === 'cpf',
        )?.value || null,
      telephone:
        person?.person_contact?.find(
          (contact) => contact.person_contact_type.slug === 'phone',
        )?.value || null,
      address:
        person?.person_address?.map((address) => ({
          street: address.street,
          number: address.number,
          district: address.district,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          country: address.country?.code || null,
          type: address.person_address_type?.slug || null,
        })) || [],
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

  async closeAccount({ email, password }: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { person_user: { include: { person: true } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const personUser = user.person_user?.[0];
    if (!personUser || !personUser.person) {
      throw new NotFoundException('Person data not found for this user');
    }

    const personId = personUser.person.id;
    await this.prisma.person_contact.deleteMany({
      where: { person_id: personId },
    });

    await this.prisma.person_address.deleteMany({
      where: { person_id: personId },
    });

    await this.prisma.person_document.deleteMany({
      where: { person_id: personId },
    });

    await this.prisma.person_user.deleteMany({
      where: { user_id: user.id },
    });

    await this.prisma.person.delete({
      where: { id: personId },
    });

    await this.prisma.user.delete({
      where: { id: user.id },
    });

    return { message: 'Account successfully deleted' };
  }

  async updateUserData({ email, name, telephone, address }: UpdateUserDataDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { person_user: { include: { person: true } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const personUser = user.person_user?.[0];
    if (!personUser || !personUser.person) {
      throw new NotFoundException('Person data not found for this user');
    }

    const personId = personUser.person.id;

    if (name) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }

    if (telephone) {
      const contactType = await this.prisma.person_contact_type.findFirst({
        where: { slug: 'phone' },
      });

      if (!contactType) {
        throw new BadRequestException('Phone contact type not found');
      }

      const existingContact = await this.prisma.person_contact.findFirst({
        where: { person_id: personId, type_id: contactType.id },
      });

      if (existingContact) {
        await this.prisma.person_contact.update({
          where: { id: existingContact.id },
          data: { value: telephone },
        });
      } else {
        await this.prisma.person_contact.create({
          data: {
            value: telephone,
            person_id: personId,
            type_id: contactType.id,
          },
        });
      }
    }

    if (address) {
      const addressType = await this.prisma.person_address_type.findFirst({
        where: { slug: 'residential' },
      });

      if (!addressType) {
        throw new BadRequestException('Residential address type not found');
      }

      const existingAddress = await this.prisma.person_address.findFirst({
        where: { person_id: personId, type_id: addressType.id },
      });

      if (existingAddress) {
        await this.prisma.person_address.update({
          where: { id: existingAddress.id },
          data: { ...address },
        });
      } else {
        await this.prisma.person_address.create({
          data: {
            ...address,
            person_id: personId,
            type_id: addressType.id,
          },
        });
      }
    }

    const newUser = await this.prisma.user.findUnique({
      where: { email },
    });

    return this.getToken(newUser);
  }

  async changePassword({
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: ChangeDTO) {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!(await compare(currentPassword, user.password))) {
      throw new NotFoundException('Invalid password');
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
    const user = await this.prisma.user.findUnique({
      where: { email: currentEmail },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const newUser = await this.prisma.user.update({
      where: { email: currentEmail },
      data: { email: newEmail },
    });

    return this.getToken(newUser);
  }

  async resetPassword({ code, newPassword, confirmNewPassword }: ResetDTO) {
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
      where: { email },
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

    await this.prisma.person_user.create({
      data: {
        person_id: person.id,
        user_id: user.id,
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
