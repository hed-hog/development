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
export class ItemService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = ['slug', 'name', 'price'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.item,
      paginationParams,
      {
        where: { OR },
        include: {
          payment_coupon_item: {
            include: {
              payment_coupon: {
                select: { code: true, value: true, discount_type: true },
              },
            },
          },
          payment_method_item: {
            include: {
              payment_method: {
                select: { name: true },
              },
              discount_type: {
                select: { name: true },
              },
            },
          },
        },
      },
    );
  }

  async get(id: number) {
    return this.prismaService.item.findUnique({
      where: { id: id },
    });
  }

  async create(data: CreateDTO) {
    const { id } = await this.prismaService.item.create({
      data: {
        slug: data.slug,
        name: data.name,
        price: data.price,
      },
    });

    data.coupon_ids.map(async (couponId) => {
      await this.prismaService.payment_coupon_item.create({
        data: {
          item_id: id,
          coupon_id: couponId,
        },
      });
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    const { id: productId } = await this.prismaService.item.update({
      where: { id: id },
      data: {
        name: data.name,
        slug: data.slug,
        price: data.price,
      },
    });

    await this.prismaService.payment_coupon_item.deleteMany({
      where: { item_id: id },
    });

    await Promise.all(
      data.coupon_ids.map(async (couponId) => {
        await this.prismaService.payment_coupon_item.create({
          data: {
            coupon_id: couponId,
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
        item_id: { in: ids },
      },
    });

    return this.prismaService.item.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
