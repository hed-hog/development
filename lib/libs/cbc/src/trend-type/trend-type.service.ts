import { DeleteDTO } from '@hedhog/core';
import { LocaleService } from '@hedhog/locale';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class TrendTypeService {
  private readonly modelName = 'trend_type';
  private readonly foreignKey = 'type_id';

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService
  ) { }

  async list(locale: string, paginationParams: PaginationDTO) {
    return this.localeService.listModelWithLocale(
      locale,
      this.modelName,
      paginationParams
    );
  }

  async get(id: number) {
    return this.localeService.getModelWithLocale(this.modelName, id);
  }

  async create(data: CreateDTO) {
    return this.localeService.createModelWithLocale(
      this.modelName,
      this.foreignKey,
      data
    );
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.localeService.updateModelWithLocale(
      this.modelName,
      this.foreignKey,
      id,
      data
    );
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.'
      );
    }

    return this.prismaService.trend_type.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
}
