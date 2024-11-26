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
export class PersonCustomService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.person_custom.create({
      data: {
        person_id: personId,
        ...data
      }
    });
  }

  async list(personId?: number, typeId?: number, customId?: number) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;
    if (typeId !== undefined) where.type_id = typeId;
    if (customId !== undefined) where.id = customId;

    const customs = await this.prismaService.person_custom.findMany({
      where,
      include: {
        person_custom_type: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (Boolean(customId) && customs.length === 0) {
      throw new NotFoundException(`custom with ID ${customId} not found`);
    }

    if (Boolean(typeId) && customs.length === 0) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return this.paginationService.paginate(
      this.prismaService.person_custom,
      {
        fields: 'id,person_id,type_id,primary,value'
      },
      {
        where,
        include: {
          person_custom_type: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    );
  }

  async update(personId: number, customId: number, data: UpdateDTO) {
    return this.prismaService.person_custom.update({
      where: {
        person_id: personId,
        id: customId
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

    return this.prismaService.person_custom.deleteMany({
      where: {
        person_id: personId,
        id: {
          in: ids
        }
      }
    });
  }
}
