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
export class Payment_gatewaysService {
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
      this.prismaService.payment_gateways,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getById(payment_gatewaysId: number) {
    return this.prismaService.payment_gateways.findUnique({
      where: { id: payment_gatewaysId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.payment_gateways.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.payment_gateways.update({
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

    return this.prismaService.payment_gateways.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
