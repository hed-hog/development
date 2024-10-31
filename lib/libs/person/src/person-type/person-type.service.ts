import { LocaleService } from '@hedhog/admin';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { getWithLocale } from '@hedhog/utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteDTO } from '../dto/delete.dto';
import { CreatePersonTypeDTO } from './dto/create-person-type.dto';
import { UpdatePersonTypeDTO } from './dto/update-person-type.dto';

@Injectable()
export class PersonTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly localeService: LocaleService,
  ) {}

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = [];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_type_locale: {
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
      'person_type_locale',
    );
  }

  async get(locale: string, typeId: number) {
    return getWithLocale(
      locale,
      'person_type_locale',
      await this.prismaService.person_type.findUnique({
        where: { id: typeId },
        include: {
          person_type_locale: {
            where: {
              locale: {
                enabled: true,
              },
            },
            select: {
              name: true,
              locale: {
                select: {
                  code: true,
                },
              },
            },
          },
        },
      }),
    );
  }

  async create({ slug, locale }: CreatePersonTypeDTO) {
    return this.localeService.createModelWithLocale(
      'person_type',
      'type_id',
      { slug },
      locale,
    );
  }

  async update({
    id,
    data: { locale, slug },
  }: {
    id: number;
    data: UpdatePersonTypeDTO;
  }) {
    return this.localeService.updateModelWithLocale(
      'person_type',
      'type_id',
      id,
      { slug },
      locale,
    );
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one PersonType to delete.`,
      );
    }

    return await this.prismaService.person_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
