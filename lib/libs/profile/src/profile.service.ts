import {
  PersonAddressTypeEnum,
  PersonContactTypeEnum,
  PersonDocumentTypeEnum,
  PersonTypeEnum,
} from '@hedhog/contact';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { CloseAccountDTO } from './dto/close-account.dto';
import { SignupDTO } from './dto/signup.dto';
import { UpdateUserDataDTO } from './dto/update.dto';
import { isValidCPF } from './validations/cpf';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwt: JwtService,
  ) {}

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
          (doc) => doc.person_document_type.id === PersonDocumentTypeEnum.CPF,
        )?.value || null,
      telephone:
        person?.person_contact?.find(
          (contact) =>
            contact.person_contact_type.id === PersonContactTypeEnum.PHONE,
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

  async closeAccount(id: number, { password }: CloseAccountDTO) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { person_user: { include: { person: true } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const personUser = (user.person_user ?? []).shift();
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

  async updateUserData(
    id: number,
    { email, name, telephone, address }: UpdateUserDataDTO,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { person_user: { include: { person: true } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const personUser = (user.person_user ?? []).shift();
    if (!personUser || !personUser.person) {
      throw new NotFoundException('Person data not found for this user');
    }

    const personId: number = Number(personUser.person.id);

    if (name) {
      await this.prisma.user.update({
        where: { id },
        data: { name },
      });
    }

    if (telephone) {
      const existingContact = await this.prisma.person_contact.findFirst({
        where: { person_id: personId, type_id: PersonContactTypeEnum.PHONE },
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
            type_id: PersonContactTypeEnum.PHONE,
          },
        });
      }
    }

    if (address) {
      const existingAddress = await this.prisma.person_address.findFirst({
        where: {
          person_id: personId,
          type_id: PersonAddressTypeEnum.RESIDENTIAL,
        },
      });

      if (existingAddress) {
        await this.prisma.person_address.update({
          where: { id: existingAddress.id },
          data: { ...address },
        });
      } else {
        await this.prisma.person_address.create({
          data: {
            city: address.city,
            district: address.district,
            postal_code: address.postal_code,
            state: address.state,
            street: address.street,
            complement: address.complement,
            country_id: address.country_id,
            number: address.number,
            primary: address.primary,
            reference: address.reference,
            person_id: personId,
            type_id: PersonAddressTypeEnum.RESIDENTIAL,
          },
        });
      }
    }

    const newUser = await this.prisma.user.findFirst({
      where: { email },
    });

    return this.getToken(newUser);
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

    if (!isValidCPF(String(cpf))) {
      throw new BadRequestException('Invalid CPF');
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

    const country = await this.prisma.country.findFirst({
      where: { code: 'BRA' },
    });

    await this.prisma.person.create({
      data: {
        name: fullName,
        photo_id: null,
        birth_at: null,
        type_id: PersonTypeEnum.PHYSICAL,
        person_user: {
          create: {
            user_id: user.id,
          },
        },
        person_address: {
          create: {
            street,
            number,
            district,
            city,
            state,
            postal_code,
            country_id: country.id,
            type_id: PersonAddressTypeEnum.RESIDENTIAL,
          },
        },
        person_contact: {
          createMany: {
            data: [
              {
                value: email,
                type_id: PersonContactTypeEnum.EMAIL,
              },
              {
                value: String(telephone),
                type_id: PersonContactTypeEnum.PHONE,
              },
            ],
          },
        },
        person_document: {
          create: {
            value: String(cpf),
            type_id: PersonDocumentTypeEnum.CPF,
            country_id: country.id,
          },
        },
      },
    });

    return this.getToken(user);
  }
}
