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
export class PaymentService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(paginationParams: PaginationDTO, isPaid: boolean) {
    const fields = [
      'slug',
      'amount',
      'document',
      'payment_at',
      'currency',
      'installments',
      'delivered',
      'discount',
    ];

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    const payments = await this.paginationService.paginate(
      this.prismaService.payment,
      paginationParams,
      {
        where: {
          OR,
          AND: isPaid ? [{ status_id: 2 }] : [],
        },
        include: {
          payment_gateway: {
            select: { name: true },
          },
          person: {
            select: { name: true },
          },
          payment_status: {
            include: {
              payment_status_locale: {
                where: { locale_id: 2 },
                select: { name: true },
              },
            },
          },
          payment_method: {
            select: { name: true },
          },
          payment_card_brand: {
            select: { name: true },
          },
          payment_coupon: {
            select: { code: true },
          },
        },
      },
    );

    return payments;
  }

  async get(id: number) {
    return this.prismaService.payment.findUnique({
      where: { id: id },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.payment.create({
      data: {
        slug: data.slug,
        amount: data.amount,
        document: data.document,
        payment_at: data.payment_at,
        currency: data.currency,
        installments: data.installments,
        delivered: data.delivered,
        discount: data.discount ?? 0,
        payment_gateway: {
          connect: {
            id: data.gateway_id,
          },
        },
        payment_status: {
          connect: {
            id: data.status_id,
          },
        },
        payment_method: {
          connect: {
            id: data.method_id,
          },
        },
        ...(data.brand_id && {
          payment_card_brand: {
            connect: {
              id: data.brand_id,
            },
          },
        }),
        ...(data.person_id && {
          person: {
            connect: {
              id: data.person_id,
            },
          },
        }),
        ...(data.coupon_id && {
          payment_coupon: {
            connect: {
              id: data.coupon_id,
            },
          },
        }),
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.payment.update({
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

    return this.prismaService.payment.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
