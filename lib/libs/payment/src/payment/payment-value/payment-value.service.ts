import { PaginationService, PaginationDTO } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Injectable()
export class PaymentValueService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async create(paymentId: number, data: CreateDTO) {
    return this.prismaService.payment_value.create({
      data: {
        payment_id: paymentId,
        ...data
      }
    });
  }

  async get(paymentId: number, id: number) {
    return this.prismaService.payment_value.findFirst({
      where: {
        payment_id: paymentId,
        id: id
      }
    });
  }

  async list(paginationParams: PaginationDTO, paymentId?: number) {
    const where: any = {};
    if (paymentId !== undefined) where.payment_id = paymentId;

    return this.paginationService.paginate(
      this.prismaService.payment_value,
      {
        fields: 'name,value',
        ...paginationParams
      },
      {
        where
      }
    );
  }

  async update(paymentId: number, id: number, data: UpdateDTO) {
    return this.prismaService.payment_value.updateMany({
      where: {
        payment_id: paymentId,
        id: id
      },
      data
    });
  }

  async delete(paymentId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.'
      );
    }

    return this.prismaService.payment_value.deleteMany({
      where: {
        payment_id: paymentId,
        id: {
          in: ids
        }
      }
    });
  }
}
