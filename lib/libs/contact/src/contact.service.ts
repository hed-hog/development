import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { PersonContactTypeEnum } from './person-contact-type/person-contact-type.enum';
import { PersonDocumentTypeEnum } from './person-document-type/person-document-type.enum';

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
    phone: string,
    cpf: string,
    cnpj: string,
  ) {
    console.log('getPersonOrCreateIfNotExists', { type_id, name, email });

    console.log('Find by email', { email });

    const findPerson = await this.prismaService.person.findFirst({
      where: {
        OR: [
          {
            person_contact: {
              some: {
                OR: [
                  {
                    value: email,
                    type_id: PersonContactTypeEnum.EMAIL,
                  },
                  {
                    value: phone,
                    type_id: PersonContactTypeEnum.PHONE,
                  },
                ],
              },
            },
            person_document: {
              some: {
                OR: [
                  {
                    value: cpf,
                    type_id: PersonDocumentTypeEnum.CPF,
                  },
                  {
                    value: cnpj,
                    type_id: PersonDocumentTypeEnum.CNPJ,
                  },
                ],
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    console.log('Result findPerson', { findPerson });

    if (findPerson) {
      console.log('Person exists', { findPerson });
      return this.getPerson(findPerson.id);
    }

    console.log('Person not exists', { findPerson });

    const person = await this.prismaService.person.create({
      data: {
        name,
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

    if (person) {
      if (email) {
        console.log('Add email', { email });
        await this.prismaService.person_contact.create({
          data: {
            value: email,
            type_id: PersonContactTypeEnum.EMAIL,
            person_id: person.id,
          },
        });
      }

      if (phone) {
        console.log('Add phone', { phone });
        await this.prismaService.person_contact.create({
          data: {
            value: phone,
            type_id: PersonContactTypeEnum.PHONE,
            person_id: person.id,
          },
        });
      }

      if (cpf) {
        console.log('Add cpf', { cpf });
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
        console.log('Add cnpj', { cnpj });
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

    console.log('Person created', { person });

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
