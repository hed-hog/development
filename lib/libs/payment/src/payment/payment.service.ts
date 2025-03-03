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

  async list(paginationParams: PaginationDTO) {
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
        },
        include: {
          gateway: {
            select: { name: true },
          },
          person: {
            select: { name: true },
          },
          status: {
            where: { locale_id: 2 },
            select: { name: true },
          },
          method: {
            select: { name: true },
          },
          brand: {
            select: { name: true },
          },
          coupon: {
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
      data,
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
