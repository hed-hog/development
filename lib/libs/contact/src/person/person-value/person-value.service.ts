import { DeleteDTO } from '@hedhog/core';
import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class PersonValueService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.person_value.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async list(personId?: number, valueId?: number) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;
    if (valueId !== undefined) where.id = valueId;

    return this.paginationService.paginate(
      this.prismaService.person_value,
      {
        fields: 'id,person_id,value',
      },
      {
        where,
      },
    );
  }

  async update(personId: number, valueId: number, data: UpdateDTO) {
    return this.prismaService.person_value.update({
      where: {
        person_id: personId,
        id: valueId,
      },
      data,
    });
  }

  async delete(personId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.person_value.deleteMany({
      where: {
        person_id: personId,
        id: {
          in: ids,
        },
      },
    });
  }
}
