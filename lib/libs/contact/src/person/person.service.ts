import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class PersonService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = ['name', 'birth_at'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.person,
      paginationParams,
      {
        where: {
          OR
        }
      }
    );
  }

  async get(personId: number) {
    return this.prismaService.person.findUnique({
      where: { id: personId }
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.person.create({
      data
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.person.update({
      where: { id },
      data
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.'
      );
    }

    return this.prismaService.person.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
}
