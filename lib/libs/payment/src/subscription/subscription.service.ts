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
export class SubscriptionService {
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
      this.prismaService.subscription,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getById(subscriptionId: number) {
    return this.prismaService.subscription.findUnique({
      where: { id: subscriptionId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.subscription.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.subscription.update({
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

    return this.prismaService.subscription.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
