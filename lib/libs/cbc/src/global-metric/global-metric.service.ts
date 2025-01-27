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
export class GlobalMetricService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = [
      'btc_dominance',
      'btc_dominance_24h_percentage_change',
      'total_market_cap_yesterday_percentage_change',
      'total_market_cap',
      'btc_future',
      'btc_future_change',
    ];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.global_metric,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(id: number) {
    return this.prismaService.global_metric.findUnique({
      where: { id: id },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.global_metric.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.global_metric.update({
      where: { id: id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.global_metric.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
