import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonContactDTO } from './dto/create-contact.dto';
import { UpdatePersonContactDTO } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreatePersonContactDTO) {
    return this.prismaService.person_contacts.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async getContacts(personId: number) {
    return this.paginationService.paginate(
      this.prismaService.person_contacts,
      {
        fields: 'id,person_id,type_id,primary,value',
      },
      {
        where: {
          person_id: personId,
        },
        include: {
          person_contact_types: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    );
  }

  async getContactByTypeId(personId: number, typeId: number) {
    const contact = await this.prismaService.person_contacts.findFirst({
      where: {
        person_id: personId,
        type_id: typeId,
      },
      include: {
        person_contact_types: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!contact) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return contact;
  }

  async getContactById(contactId: number) {
    return this.prismaService.person_contacts.findFirst({
      where: {
        id: contactId,
      },
      include: {
        person_contact_types: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(contactId: number, data: UpdatePersonContactDTO) {
    return this.prismaService.person_contacts.update({
      where: { id: contactId },
      data,
    });
  }

  async remove(contactId: number) {
    return this.prismaService.person_contacts
      .delete({
        where: {
          id: contactId,
        },
      })
      .then((data) => {
        return { count: 1 };
      });
  }
}
