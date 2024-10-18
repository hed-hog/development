import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@hedhog/prisma';
import { CreatePersonDTO } from './dto/create-person.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { DeleteDTO } from './dto/delete.dto';
import { itemTranslations } from '@hedhog/utils';

@Injectable()
export class PersonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreatePersonDTO) {
    return await this.prismaService.persons.create({
      data,
    });
  }

  async getPersons(locale: string, paginationParams: PaginationDTO) {
    const fields = ['name'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    let paginate = await this.paginationService.paginate(
      this.prismaService.persons,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_types: {
            select: {
              id: true,
              person_type_translations: {
                where: {
                  locales: {
                    code: locale,
                  },
                },
                select: {
                  name: true,
                },
              },
            },
          },
          person_documents: {
            include: {
              person_document_types: {
                select: {
                  id: true,
                  person_document_type_translations: {
                    where: {
                      locales: {
                        code: locale,
                      },
                    },
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          person_contacts: {
            include: {
              person_contact_types: {
                select: {
                  id: true,
                  person_contact_type_translations: {
                    where: {
                      locales: {
                        code: locale,
                      },
                    },
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          person_addresses: true,
        },
      },
    );

    paginate.data = paginate.data.map((person: any) => {
      if (person.person_types) {
        person.person_types = itemTranslations(
          'person_type_translations',
          person.person_types,
        );
      }
      if (person.person_documents) {
        person.person_documents = person.person_documents.map((document) => {
          if (document.person_document_types) {
            document.person_document_types = itemTranslations(
              'person_document_type_translations',
              document.person_document_types,
            );
          }
          return document;
        });
      }
      if (person.person_contacts) {
        person.person_contacts = person.person_contacts.map((contact) => {
          if (contact.person_contact_types) {
            contact.person_contact_types = itemTranslations(
              'person_contact_type_translations',
              contact.person_contact_types,
            );
          }
          return contact;
        });
      }

      return person;
    });

    return paginate;
  }

  async getPersonById(id: number) {
    const person = await this.prismaService.persons.findUnique({
      where: { id },
      include: {
        person_addresses: true,
        /*
        person_contacts: {
          include: {
            person_contact_types: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        person_customs: {
          include: {
            person_custom_types: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        person_documents: {
          include: {
            person_document_types: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        */
      },
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return person;
  }

  async update(id: number, data: UpdatePersonDTO) {
    return await this.prismaService.persons.update({
      where: { id },
      data: data,
    });
  }

  async remove({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one person to delete.`,
      );
    }

    return await this.prismaService.persons.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
