import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { PersonContactTypeEnum } from './person-contact-type/person-contact-type.enum';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

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
  ) {
    const findByEmail = await this.prismaService.person.findFirst({
      where: {
        person_contact: {
          some: {
            value: email,
            type_id: PersonContactTypeEnum.EMAIL,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (findByEmail) {
      return this.getPerson(findByEmail.id);
    }

    const person = await this.prismaService.person.create({
      data: {
        name,
        person_contact: {
          create: {
            value: email,
            type_id: PersonContactTypeEnum.EMAIL,
          },
        },
        person_type: {
          connect: {
            id: type_id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return this.getPerson(person.id);
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
}
