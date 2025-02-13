import { DeleteDTO } from '@hedhog/core';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { subscription_status_enum } from '@prisma/client';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = ['status', 'limit'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.subscription,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(id: number) {
    return this.prismaService.subscription.findUnique({
      where: { id: id },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.subscription.create({
      data: {
        status: data.status as subscription_status_enum,
        plan_id: data.plan_id,
        limit: data.limit || 1,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.subscription.update({
      where: { id: id },
      data: {
        status: data.status as subscription_status_enum,
        plan_id: data.plan_id,
        limit: data.limit || 1,
      },
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.subscription.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
