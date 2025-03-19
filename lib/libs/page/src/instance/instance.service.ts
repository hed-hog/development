import { DeleteDTO } from '@hedhog/core';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class InstanceService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = ['name', 'order', 'visibility'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.instance,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(id: number) {
    return this.prismaService.instance.findUnique({
      where: { id: id },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.instance.create({
      data: {
        name: data.name,
        order: data.order,
        component_id: data.component_id,
        parent_id: data.parent_id,
        visibility: data.visibility as any,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.instance.update({
      where: { id: id },
      data: {
        name: data.name,
        order: data.order,
        component_id: data.component_id,
        parent_id: data.parent_id,
        visibility: data.visibility as any,
      },
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.instance.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
