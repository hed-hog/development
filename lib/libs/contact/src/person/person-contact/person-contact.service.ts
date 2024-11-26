import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Injectable()
export class PersonContactService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.person_contact.create({
      data: {
        person_id: personId,
        ...data
      }
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
            name: true
          }
        }
      }
    });

    if (Boolean(contactId) && contacts.length === 0) {
      throw new NotFoundException(`contact with ID ${contactId} not found`);
    }

    if (Boolean(typeId) && contacts.length === 0) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return this.paginationService.paginate(
      this.prismaService.person_contact,
      {
        fields: 'id,person_id,type_id,primary,value'
      },
      {
        where,
        include: {
          person_contact_type: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    );
  }

  async update(personId: number, contactId: number, data: UpdateDTO) {
    return this.prismaService.person_contact.update({
      where: {
        person_id: personId,
        id: contactId
      },
      data
    });
  }

  async delete(personId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.'
      );
    }

    return this.prismaService.person_contact.deleteMany({
      where: {
        person_id: personId,
        id: {
          in: ids
        }
      }
    });
  }
}
