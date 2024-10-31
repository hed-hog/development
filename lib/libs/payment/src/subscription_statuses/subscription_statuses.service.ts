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
export class Subscription_statusesService {
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
      subscription_statuses: {
        select: {
          id: true,
          subscription_status_translations: {
            where: {
              locales: {
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
      this.prismaService.subscription_status_translations,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      'subscription_status_translations',
    );
  }

  async getById(subscription_statusesId: number) {
    return this.prismaService.subscription_statuses.findUnique({
      where: { id: subscription_statusesId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.subscription_statuses.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.subscription_statuses.update({
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

    return this.prismaService.subscription_statuses.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
