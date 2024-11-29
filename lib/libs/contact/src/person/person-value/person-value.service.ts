import { PaginationService, PaginationDTO } from '@hedhog/pagination';
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
export class PersonValueService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.person_value.create({
      data: {
        person_id: personId,
        ...data
      }
    });
  }

  async list(paginationParams: PaginationDTO, personId?: number) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;

    return this.paginationService.paginate(
      this.prismaService.person_value,
      {
        fields: 'value',
        ...paginationParams
      },
      {
        where
      }
    );
  }

  async update(personId: number, id: number, data: UpdateDTO) {
    return this.prismaService.person_value.updateMany({
      where: {
        person_id: personId,
        id: id
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

    return this.prismaService.person_value.deleteMany({
      where: {
        person_id: personId,
        id: {
          in: ids
        }
      }
    });
  }
}
