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
export class SubscriptionStatusService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async get(locale: string, paginationParams: PaginationDTO) {
    const OR: any[] = [
      {
        name: { contains: paginationParams.search, mode: 'insensitive' },
      },
      { id: { equals: +paginationParams.search } },
    ];

    const include = {
      subscription_status: {
        select: {
          id: true,
          subscription_status_locale: {
            where: {
              locale: {
                code: locale,
              },
            },
            select: {
              name: true,
            },
          },
        },
      },
    };

    return this.paginationService.paginate(
      this.prismaService.subscription_status_locale,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      'subscription_status_locale',
    );
  }

  async getById(subscriptionStatusId: number) {
    return this.prismaService.subscription_status.findUnique({
      where: { id: subscriptionStatusId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.subscription_status.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.subscription_status.update({
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

    return this.prismaService.subscription_status.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
