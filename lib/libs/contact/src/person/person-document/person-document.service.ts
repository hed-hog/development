import { DeleteDTO } from '@hedhog/core';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class PersonDocumentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.person_document.create({
      data: {
        ...data,
        person_id: personId,
        issued_at: data.issued_at || null,
        expiry_at: data.expiry_at || null,
      },
    });
  }

  async get(personId: number, id: number) {
    return this.prismaService.person_document.findFirst({
      where: {
        person_id: personId,
        id: id,
      },
    });
  }

  async list(paginationParams: PaginationDTO, personId?: number) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;

    return this.paginationService.paginate(
      this.prismaService.person_document,
      {
        fields: 'primary,value,issued_at,expiry_at',
        ...paginationParams,
      },
      {
        where,
      },
    );
  }

  async update(personId: number, id: number, data: UpdateDTO) {
    return this.prismaService.person_document.updateMany({
      where: {
        person_id: personId,
        id: id,
      },
      data: {
        ...data,
        issued_at: data.issued_at || null,
        expiry_at: data.expiry_at || null,
      },
    });
  }

  async delete(personId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.person_document.deleteMany({
      where: {
        person_id: personId,
        id: {
          in: ids,
        },
      },
    });
  }
}
