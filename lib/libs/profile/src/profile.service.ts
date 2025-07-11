import {
  PersonAddressTypeEnum,
  PersonContactTypeEnum,
  PersonDocumentTypeEnum,
  PersonTypeEnum,
} from '@hedhog/contact';
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
import { CloseAccountDTO } from './dto/close-account.dto';
import { SignupDTO } from './dto/signup.dto';
import { UpdateUserDataDTO } from './dto/update.dto';
import {
  getCloseAccountEmail,
  getCreateUserEmail,
  getUpdateUserEmail,
} from './emails';
import { cleanCPF, isValidCPF } from './validations/cpf';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwt: JwtService,
    @Inject(forwardRef(() => MailService))
    private readonly mail: MailService,
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
      throw new NotFoundException('Não foi possível obter dados de usuário.');
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
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { person_user: { include: { person: true } } },
      });

      if (!user) {
        throw new BadRequestException('Usuário não encontrado.');
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Senha inválida.');
      }

      const personUser = (user.person_user ?? []).shift();
      if (!personUser || !personUser.person) {
        throw new NotFoundException(
          'Dados pessoais não foram encontrados para esse usuário.',
        );
      }

      const personId = personUser.person.id;

      await this.prisma.payment.updateMany({
        where: {
          person_id: personId,
        },
        data: {
          person_id: null,
        },
      });

      await this.prisma.subscription_person.deleteMany({
        where: {
          person_id: personId,
        },
      });

      await this.prisma.subscription_cancel.deleteMany({
        where: {
          person_id: personId,
        },
      });

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

      await this.mail.send({
        to: user.email,
        subject: `Conta excluída`,
        body: getCloseAccountEmail(),
      });

      return { message: 'Conta excluída com sucesso' };
    } catch (error: any) {
      throw new BadRequestException(error?.message ?? 'Erro ao excluir conta.');
    }
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
      throw new NotFoundException('Usuário não encontrado.');
    }

    const personUser = (user.person_user ?? []).shift();
    if (!personUser || !personUser.person) {
      throw new NotFoundException(
        'Dados pessoais não foram encontrados para esse usuário.',
      );
    }

    const personId: number = Number(personUser.person.id);

    if (name) {
      await this.prisma.user.update({
        where: { id },
        data: { name },
      });

      const personUser = await this.prisma.person_user.findFirst({
        where: { user_id: id },
        select: { person_id: true },
      });

      if (personUser?.person_id) {
        await this.prisma.person.update({
          where: { id: personUser.person_id },
          data: { name },
        });
      }
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

    this.mail.send({
      to: email,
      subject: `Atualizações no seu perfil`,
      body: getUpdateUserEmail(),
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

    const cpfCleaned = cleanCPF(String(cpf));

    const existingCpf = await this.prisma.person_document.findFirst({
      where: { value: cpfCleaned },
    });

    if (existingUser) {
      throw new BadRequestException('Já existe um usuário com esse e-mail.');
    }

    if (existingCpf) {
      throw new BadRequestException('Já existe um usuário com esse CPF.');
    }

    if (!isValidCPF(cpfCleaned)) {
      throw new BadRequestException('CPF inválido.');
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      throw new BadRequestException(
        'O nome completo deve incluir pelo menos o primeiro e o último nome.',
      );
    }

    const formattedName = nameParts
      .map((part, index) => {
        if (
          index > 0 &&
          ['de', 'da', 'do', 'dos', 'das', 'e'].includes(part.toLowerCase())
        ) {
          return part.toLowerCase();
        }
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join(' ');

    fullName = formattedName;

    const addressFields = [street, number, district, city, state, postal_code];
    const hasAnyAddressField = addressFields.some(
      (field) => field !== undefined && field !== null,
    );
    const hasAllAddressFields = addressFields.every(
      (field) => field !== undefined && field !== null,
    );

    if (hasAnyAddressField && !hasAllAddressFields) {
      throw new BadRequestException(
        'Se um campo de endereço for fornecido, todos devem ser preenchidos.',
      );
    }

    const personContactData = [
      {
        value: email,
        type_id: PersonContactTypeEnum.EMAIL,
      },
    ];

    if (telephone) {
      personContactData.push({
        value: String(telephone),
        type_id: PersonContactTypeEnum.PHONE,
      });
    }

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

    const userRole = await this.prisma.role.findFirst({
      where: { slug: 'user' },
    });

    if (!userRole) {
      throw new Error('Role padrão "user" não encontrada');
    }

    await this.prisma.role_user.create({
      data: {
        user_id: user.id,
        role_id: userRole.id,
      },
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
        person_address: hasAllAddressFields
          ? {
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
            }
          : undefined,
        person_contact: {
          createMany: {
            data: personContactData,
          },
        },
        person_document: {
          create: {
            value: cpfCleaned,
            type_id: PersonDocumentTypeEnum.CPF,
            country_id: country.id,
          },
        },
      },
    });

    await this.mail.send({
      to: email,
      subject: `Bem-vindo ao CoinBitClub!`,
      body: getCreateUserEmail(user.name),
    });

    return this.getToken(user);
  }
}
