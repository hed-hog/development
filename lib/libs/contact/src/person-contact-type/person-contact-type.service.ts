import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';

import { LocaleService } from '@hedhog/locale';

@Injectable()
export class PersonContactTypeService {
  private readonly modelName = 'person_contact_type';
  private readonly foreignKey = 'type_id';

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,

    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
  ) {}

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const include = {
      person_contact_type_locale: {
        where: {
          locale: {
            code: locale,
          },
        },
        select: {
          name: true,
        },
      },
    };

    return this.paginationService.paginate(
      this.prismaService.person_contact_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      'person_contact_type_locale',
    );
  }

  async get(personContactTypeId: number) {
    return this.localeService.getModelWithLocale(
      this.modelName,
      personContactTypeId,
    );
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

    return this.prismaService.person_contact_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
