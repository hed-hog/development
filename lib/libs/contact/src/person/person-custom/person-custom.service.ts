import { DeleteDTO } from '@hedhog/core';
import { LocaleService } from '@hedhog/locale';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class PersonCustomService {
  private readonly modelName = 'person_custom';
  private readonly foreignKey = 'custom_id';

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService
  ) {}

  async list(
    locale: string,
    personId: number,
    paginationParams: PaginationDTO
  ) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;

    return this.localeService.listModelWithLocale(
      locale,
      this.modelName,
      paginationParams,
      {
        person_id: personId
      }
    );
  }

  async get(id: number) {
    return this.localeService.getModelWithLocale(this.modelName, id);
  }

  async create(personId: number, data: CreateDTO) {
    data.person_id = personId;

    return this.localeService.createModelWithLocale(
      this.modelName,
      this.foreignKey,
      data
    );
  }

  async update(id: number, personId: number, data: UpdateDTO) {
    return this.localeService.updateModelWithLocale(
      this.modelName,
      this.foreignKey,
      id,
      data,
      {
        person_id: personId
      }
    );
  }

  async delete(personId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.'
      );
    }

    return this.prismaService.person_custom.deleteMany({
      where: {
        person_id: personId,
        id: {
          in: ids
        }
      }
    });
  }
}
