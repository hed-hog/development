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
export class PersonAddressService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.personAddress.create({
      data: {
        person_id: personId,
        ...data
      }
    });
  }

  async list(personId?: number, id?: number) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;
    if (id !== undefined) where.id = id;

    return this.paginationService.paginate(
      this.prismaService.personAddress,
      {
        fields:
          'primary,street,number,complement,district,city,state,postal_code,reference'
      },
      {
        where
      }
    );
  }

  async update(personId: number, id: number, data: UpdateDTO) {
    return this.prismaService.personAddress.updateMany({
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

    return this.prismaService.person_address.deleteMany({
      where: {
        person_id: personId,
        id: {
          in: ids
        }
      }
    });
  }
}
