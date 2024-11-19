import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/utils';
import { UpdateDTO } from './dto/update.dto';
import { LocaleService } from '@hedhog/locale';

@Injectable()
export class PersonTypeService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const include = {
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
    };

    return this.paginationService.paginate(
      this.prismaService.person_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      'person_type_locale',
    );
  }

  async get(personTypeId: number) {
    const localeMap = await this.localeService.enabledLocalesMap();
    const result = await this.prismaService.person_type.findUnique({
      where: { id: personTypeId },
      include: {
        person_type_locale: true,
      },
    });

    if (!result) {
      return null;
    }

    const locale = result.person_type_locale.reduce((acc, localeData) => {
      const localeCode = Object.keys(localeMap).find(
        (code) => localeMap[code] === localeData.locale_id,
      );
      if (localeCode) {
        acc[localeCode] = { name: localeData.name };
      }
      return acc;
    }, {});

    return {
      id: result.id,
      slug: result.slug,
      created_at: result.created_at,
      updated_at: result.updated_at,
      locale,
    };
  }

  async create(data: CreateDTO) {
    const localeMap = await this.localeService.enabledLocalesMap();
    return this.prismaService.person_type.create({
      data: {
        slug: data.slug,
        created_at: new Date(),
        updated_at: new Date(),
        person_type_locale: {
          create: Object.keys(localeMap).map((code) => ({
            locale_id: localeMap[code],
            name: data.locale[code].name,
          })),
        },
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    const localeMap = await this.localeService.enabledLocalesMap();
    return this.prismaService.person_type.update({
      where: { id },
      data: {
        slug: data.slug,
        updated_at: new Date(),
        person_type_locale: {
          upsert: Object.keys(localeMap).map((code) => ({
            where: {
              type_id_locale_id: { type_id: id, locale_id: localeMap[code] },
            },
            update: {
              name: data.locale[code].name,
            },
            create: {
              locale_id: localeMap[code],
              name: data.locale[code].name,
            },
          })),
        },
      },
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.person_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
