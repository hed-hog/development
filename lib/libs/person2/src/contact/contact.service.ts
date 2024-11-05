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
    return this.prismaService.person_contact.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async list(personId?: number, typeId?: number, contactId?: number) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;
    if (typeId !== undefined) where.type_id = typeId;
    if (contactId !== undefined) where.id = contactId;

    const contacts = await this.prismaService.person_contact.findMany({
      where,
      include: {
        person_contact_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (Boolean(contactId) && contacts.length === 0) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    if (Boolean(typeId) && contacts.length === 0) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return this.paginationService.paginate(
      this.prismaService.person_contact,
      {
        fields: 'id,person_id,type_id,primary,value',
      },
      {
        where,
        include: {
          person_contact_type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    );
  }

  async update(contactId: number, data: UpdatePersonContactDTO) {
    return this.prismaService.person_contact.update({
      where: { id: contactId },
      data,
    });
  }

  async delete(contactId: number) {
    return this.prismaService.person_contact
      .delete({
        where: {
          id: contactId,
        },
      })
      .then(() => {
        return { count: 1 };
      });
  }
}
