import { MailService } from '@hedhog/mail';
import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getCreatePersonUserlessEmail } from './emails';
import { PersonContactTypeEnum } from './person-contact-type/person-contact-type.enum';
import { PersonDocumentTypeEnum } from './person-document-type/person-document-type.enum';

@Injectable()
export class ContactService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async getPerson(personId: number) {
    return this.prismaService.person.findUnique({
      where: {
        id: personId,
      },
      include: {
        person_contact: true,
        person_type: true,
        person_address: true,
        person_custom: true,
        person_document: true,
        person_user: true,
        person_value: true,
        file: true,
      },
    });
  }

  async getPersonOrCreateIfNotExists(
    type_id: number,
    name: string,
    email: string,
    phone: string,
    cpf: string,
    cnpj: string,
  ) {
    const findPersonByEmail = await this.prismaService.person.findFirst({
      where: {
        person_contact: {
          some: {
            value: email,
            type_id: PersonContactTypeEnum.EMAIL,
          },
        },
      },
      select: { id: true },
    });

    if (findPersonByEmail) {
      return {
        person: await this.getPerson(findPersonByEmail.id),
        created: false,
      };
    }

    const payload = {
      email,
    };

    const code = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    const person = await this.prismaService.person.create({
      data: {
        name,
        person_type: {
          connect: {
            id: type_id,
          },
        },
        person_user: {
          create: {
            user: {
              create: {
                email,
                name,
                password: '',
                code,
              },
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (person) {
      if (email) {
        await this.prismaService.person_contact.create({
          data: {
            value: email,
            type_id: PersonContactTypeEnum.EMAIL,
            person_id: person.id,
          },
        });
      }

      if (phone) {
        await this.prismaService.person_contact.create({
          data: {
            value: phone,
            type_id: PersonContactTypeEnum.PHONE,
            person_id: person.id,
          },
        });
      }

      if (cpf) {
        await this.prismaService.person_document.create({
          data: {
            value: cpf,
            type_id: PersonDocumentTypeEnum.CPF,
            person_id: person.id,
            country_id: 1,
          },
        });
      }

      if (cnpj) {
        await this.prismaService.person_document.create({
          data: {
            value: cnpj,
            type_id: PersonDocumentTypeEnum.CNPJ,
            person_id: person.id,
            country_id: 1,
          },
        });
      }
    }

    const appURL =
      process.env.APP_URL ?? this.configService.get<string>('APP_URL');

    await this.mailService.send({
      to: email,
      subject: 'Crie sua conta',
      body: getCreatePersonUserlessEmail({
        name,
        url: `${appURL}/create-user?code=${code}`,
      }),
    });

    return {
      person: await this.getPerson(person.id),
      created: true,
      code,
    };
  }

  async addContactIfNotExists(personId: number, value: string, typeId: number) {
    const exists = await this.prismaService.person_contact.findFirst({
      where: {
        person_id: personId,
        value,
        type_id: typeId,
      },
    });

    if (exists) {
      return exists;
    }

    return this.prismaService.person_contact.create({
      data: {
        value,
        type_id: typeId,
        person_id: personId,
      },
    });
  }

  async addDocumentIfNotExists(
    personId: number,
    value: string,
    typeId: number,
    countryId = 1,
  ) {
    const exists = await this.prismaService.person_document.findFirst({
      where: {
        person_id: personId,
        value,
        type_id: typeId,
      },
    });

    if (exists) {
      return exists;
    }

    return this.prismaService.person_document.create({
      data: {
        value,
        type_id: typeId,
        person_id: personId,
        country_id: countryId,
      },
    });
  }

  async getPersonContact(personId: number, typeId: PersonContactTypeEnum) {
    return this.prismaService.person_contact.findFirst({
      where: {
        person_id: personId,
        type_id: typeId,
      },
    });
  }

  async getPersonDocument(personId: number, typeId: PersonDocumentTypeEnum) {
    return this.prismaService.person_document.findFirst({
      where: {
        person_id: personId,
        type_id: typeId,
      },
    });
  }
}
