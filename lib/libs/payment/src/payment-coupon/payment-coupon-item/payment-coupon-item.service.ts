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
export class PaymentCouponItemService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async create(couponId: number, data: CreateDTO) {
    return this.prismaService.payment_coupon_item.create({
      data: {
        coupon_id: couponId,
        ...data,
      },
    });
  }

  async get(couponId: number, id: number) {
    return this.prismaService.payment_coupon_item.findFirst({
      where: {
        coupon_id: couponId,
        id: id,
      },
    });
  }

  async list(paginationParams: PaginationDTO, couponId?: number) {
    const where: any = {};
    if (couponId !== undefined) where.coupon_id = couponId;

    return this.paginationService.paginate(
      this.prismaService.payment_coupon_item,
      {
        fields: '',
        ...paginationParams,
      },
      {
        where,
      },
    );
  }

  async update(couponId: number, id: number, data: UpdateDTO) {
    return this.prismaService.payment_coupon_item.updateMany({
      where: {
        coupon_id: couponId,
        id: id,
      },
      data,
    });
  }

  async delete(couponId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.payment_coupon_item.deleteMany({
      where: {
        coupon_id: couponId,
        id: {
          in: ids,
        },
      },
    });
  }
}
