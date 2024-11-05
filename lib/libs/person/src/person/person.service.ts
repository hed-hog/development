import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { itemTranslations } from '@hedhog/utils';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from './dto/delete.dto';

@Injectable()
export class PersonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateDTO) {
    return await this.prismaService.person.create({
      data,
    });
  }

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = ['name'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const paginate = await this.paginationService.paginate(
      this.prismaService.person,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_type: {
            select: {
              id: true,
              person_type_locale: {
                where: {
                  locale: {
                    code: locale,
                  },
                },
                select: {
                  name: true,
                },
              },
            },
          },
          person_document: {
            include: {
              person_document_type: {
                select: {
                  id: true,
                  person_document_type_locale: {
                    where: {
                      locale: {
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
          person_contact: {
            include: {
              person_contact_type: {
                select: {
                  id: true,
                  person_contact_type_locale: {
                    where: {
                      locale: {
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
          person_address: true,
          person_custom: {
            include: {
              person_custom_type: true,
            },
          },
        },
      },
    );

    paginate.data = paginate.data.map((person: any) => {
      if (person.person_type) {
        person.person_type = itemTranslations(
          'person_type_locale',
          person.person_type,
        );
      }
      if (person.person_document) {
        person.person_document = person.person_document.map((document) => {
          if (document.person_document_type) {
            document.person_document_type = itemTranslations(
              'person_document_type_locale',
              document.person_document_type,
            );
          }
          return document;
        });
      }
      if (person.person_contact) {
        person.person_contact = person.person_contact.map((contact) => {
          if (contact.person_contact_type) {
            contact.person_contact_type = itemTranslations(
              'person_contact_type_locale',
              contact.person_contact_type,
            );
          }
          return contact;
        });
      }

      return person;
    });

    return paginate;
  }

  async get(id: number) {
    const person = await this.prismaService.person.findUnique({
      where: { id },
      include: {
        person_address: true,
        /*
        person_contact: {
          include: {
            person_contact_type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        person_custom: {
          include: {
            person_custom_type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        person_document: {
          include: {
            person_document_type: {
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

  async update(id: number, data: UpdateDTO) {
    return await this.prismaService.person.update({
      where: { id },
      data: data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one person to delete.`,
      );
    }

    return await this.prismaService.person.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
