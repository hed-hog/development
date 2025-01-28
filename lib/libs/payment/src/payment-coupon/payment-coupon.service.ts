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
export class PaymentCouponService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = [
      'code',
      'description',
      'value',
      'active',
      'uses_limit',
      'uses_qtd',
      'starts_at',
      'ends_at',
    ];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.payment_coupon,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(id: number) {
    return this.prismaService.payment_coupon.findUnique({
      where: { id: id },
    });
  }

  async codeExists(code: string, id?: number) {
    const exists = await this.prismaService.payment_coupon.count({
      where: { code: code, id: { not: id } },
    });

    return exists > 0;
  }

  async create({
    code,
    discount_type_id,
    value,
    active,
    description,
    uses_limit,
    uses_qtd,
    starts_at,
    ends_at,
  }: CreateDTO) {
    if (await this.codeExists(code)) {
      throw new BadRequestException('Code already exists.');
    }

    return this.prismaService.payment_coupon.create({
      data: {
        code,
        discount_type_id,
        value,
        active,
        description,
        uses_limit: uses_limit ?? 0,
        uses_qtd: uses_qtd ?? 0,
        starts_at: starts_at ? new Date(starts_at) : new Date(),
        ends_at: ends_at ? new Date(ends_at) : null,
      },
    });
  }

  async update({
    id,
    data: {
      code,
      discount_type_id,
      value,
      active,
      description,
      uses_limit,
      uses_qtd,
      starts_at,
      ends_at,
    },
  }: {
    id: number;
    data: UpdateDTO;
  }) {
    if (code) {
      if (await this.codeExists(code, id)) {
        throw new BadRequestException('Code already exists.');
      }
    }

    return this.prismaService.payment_coupon.update({
      where: { id: id },
      data: {
        code,
        discount_type_id,
        value,
        active,
        description,
        uses_limit: uses_limit ?? null,
        uses_qtd: uses_qtd ?? 0,
        starts_at: starts_at ? new Date(starts_at) : new Date(),
        ends_at: ends_at ? new Date(ends_at) : null,
      },
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.payment_coupon.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
