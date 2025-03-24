import { DeleteDTO } from '@hedhog/core';
import { LocaleService } from '@hedhog/locale';
import { PaginationDTO } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly localeService: LocaleService,
    private readonly prismaService: PrismaService,
  ) {}
  private readonly modelName = 'dashboard';
  private readonly foreignKey = 'dashboard_id';

  async list(locale: string, paginationParams: PaginationDTO) {
    return this.localeService.listModelWithLocale(
      locale,
      'dashboard',
      paginationParams,
      {},
      {
        dashboard_item: {
          include: {
            dashboard_component: true,
          },
        },
      },
    );
  }

  async get(id: number) {
    return this.localeService.getModelWithLocale(this.modelName, id);
  }

  async create(data: CreateDTO) {
    return this.localeService.createModelWithLocale(
      this.modelName,
      this.foreignKey,
      data,
    );
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.localeService.updateModelWithLocale(
      this.modelName,
      this.foreignKey,
      id,
      data,
    );
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.dashboard.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
