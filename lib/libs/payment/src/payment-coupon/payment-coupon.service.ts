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
import { includePaymentCoupon } from './payment-coupon.consts';

@Injectable()
export class PaymentCouponService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) { }

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
        where: { OR },
        include: {
          discount_type: {
            select: { name: true },
          },
          payment_coupon_item: {
            include: {
              item: {
                select: { name: true },
              },
            },
          },
        },
      },
    );
  }

  async get(id: number) {
    return this.prismaService.payment_coupon.findUnique({
      where: { id: id },
      include: includePaymentCoupon,
    });
  }

  async create(data: CreateDTO) {
    const { id } = await this.prismaService.payment_coupon.create({
      data: {
        code: data.code,
        discount_type_id: data.discount_type_id,
        description: data.description,
        value: data.value,
        active: data.active,
        uses_limit: data.uses_limit,
        uses_qtd: data.uses_qtd,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
      },
    });

    await Promise.all(
      data.product_ids.map(async (productId) => {
        await this.prismaService.payment_coupon_item.create({
          data: {
            coupon_id: id,
            item_id: productId,
          },
        });
      }),
    );
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    await this.prismaService.payment_coupon.update({
      where: { id },
      data: {
        code: data.code,
        discount_type_id: data.discount_type_id,
        description: data.description,
        value: data.value,
        active: data.active,
        uses_limit: data.uses_limit,
        uses_qtd: data.uses_qtd,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
      },
    });

    await this.prismaService.payment_coupon_item.deleteMany({
      where: { coupon_id: id },
    });

    await Promise.all(
      data.product_ids.map(async (productId) => {
        await this.prismaService.payment_coupon_item.create({
          data: {
            coupon_id: id,
            item_id: productId,
          },
        });
      }),
    );
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    await this.prismaService.payment_coupon_item.deleteMany({
      where: {
        coupon_id: { in: ids },
      },
    });

    return this.prismaService.payment_coupon.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
