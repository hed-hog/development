import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class PaymentSubscriptionService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async get(paginationParams: PaginationDTO) {
    const OR: any[] = [];

    if (!isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.payment_subscription,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getById(paymentSubscriptionId: number) {
    return this.prismaService.payment_subscription.findUnique({
      where: { id: paymentSubscriptionId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.payment_subscription.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.payment_subscription.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.payment_subscription.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
