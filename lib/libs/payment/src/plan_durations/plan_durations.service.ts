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
export class Plan_durationsService {
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
      plan_durations: {
        select: {
          id: true,
          plan_duration_translations: {
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
      this.prismaService.plan_duration_translations,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      'plan_duration_translations',
    );
  }

  async getById(plan_durationsId: number) {
    return this.prismaService.plan_duration.findUnique({
      where: { id: plan_durationsId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.plan_duration.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.plan_duration.update({
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

    return this.prismaService.plan_duration.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
