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
export class LocaleService {
  private codes: any = {};

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async setEnabled(codes: string[]) {
    if (!codes || codes.length < 1) {
      throw new BadRequestException('You must select at least one item code.');
    }

    await this.prismaService.locale.updateMany({
      where: {
        enabled: true,
      },
      data: {
        enabled: false,
      },
    });

    return this.prismaService.locale.updateMany({
      where: {
        code: {
          in: codes,
        },
      },
      data: {
        enabled: true,
      },
    });
  }

  async getEnables(locale: string, paginationParams: PaginationDTO) {
    const fields = ['code', 'region'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const result = await this.paginationService.paginate(
      this.prismaService.locale,
      paginationParams,
      {
        where: {
          AND: [
            {
              enabled: true,
            },
            {
              OR,
            },
          ],
        },
      },
    );

    const codes = [];

    for (const item of result.data) {
      codes.push((item as any).code);
    }

    const { code, region, locales } = this.parseLocale(locale);

    const where: any = {
      locales: {
        code,
      },
      translation_namespaces: {
        name: 'translation',
      },
    };

    if (locales.length > 1) {
      where.locale.region = region;
    }

    const values = await this.prismaService.translation.findMany({
      where,
      select: {
        name: true,
        value: true,
      },
    });

    for (let i = 0; i < result.data.length; i++) {
      for (const value of values) {
        if (value.name === (result.data[i] as any).code) {
          (result.data[i] as any).name = value.value;
          break;
        }
      }
    }

    return result;
  }

  parseLocale(locale: string) {
    const localeCodes = locale.toLowerCase().split('-');
    const code = localeCodes[0];
    const region = localeCodes[1];
    return {
      code,
      region,
      locales: localeCodes,
    };
  }

  async getTranslations(localeCode: string, namespace: string) {
    if (!localeCode) {
      throw new BadRequestException('Locale code is required.');
    }

    if (!namespace) {
      namespace = 'translation';
    }

    const { code, region, locales } = this.parseLocale(localeCode);
    const where: any = {
      locales: {
        code,
      },
      translation_namespaces: {
        name: namespace,
      },
    };

    if (locales.length > 1) {
      where.locales.region = region;
    }

    const values = await this.prismaService.translation.findMany({
      where,
      select: {
        name: true,
        value: true,
      },
    });

    const translations = {};

    for (const value of values) {
      translations[value.name] = value.value;
    }

    return translations;
  }

  async get(locale: string, paginationParams: PaginationDTO) {
    const fields = ['code', 'region'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const result = await this.paginationService.paginate(
      this.prismaService.locale,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );

    const codes = [];

    for (const item of result.data) {
      codes.push((item as any).code);
    }

    const { code, region, locales } = this.parseLocale(locale);

    const where: any = {
      locales: {
        code,
      },
      translation_namespaces: {
        name: 'translation',
      },
    };

    if (locales.length > 1) {
      where.locale.region = region;
    }

    const values = await this.prismaService.translation.findMany({
      where,
      select: {
        name: true,
        value: true,
      },
    });

    for (let i = 0; i < result.data.length; i++) {
      for (const value of values) {
        if (value.name === (result.data[i] as any).code) {
          (result.data[i] as any).name = value.value;
          break;
        }
      }
    }

    return result;
  }

  async getByCode(code: string) {
    if (this.codes[code]) {
      return this.codes[code];
    }
    return (this.codes[code] = await this.prismaService.locale.findFirst({
      where: { code },
    }));
  }

  async getById(localesId: number) {
    return this.prismaService.locale.findUnique({
      where: { id: localesId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.locale.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.locale.update({
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

    return this.prismaService.locale.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  private getTableNameTranslations(modelName: string) {
    const modelNames = modelName.split('_');
    modelNames.push('locale');
    return modelNames.join('_');
  }

  async createModelWithLocales<T>(
    modelName: string,
    foreginKeyName: string,
    data: T,
    locales: Record<string, string>,
  ) {
    const model = await this.prismaService[modelName].create({
      data,
    });

    for (const localeCode of Object.keys(locales)) {
      const locale = await this.getByCode(localeCode);

      const data: any = {};

      for (const key of Object.keys(locales[localeCode])) {
        data[key] = locales[localeCode][key];
      }

      await this.prismaService[this.getTableNameTranslations(modelName)].create(
        {
          data: {
            [foreginKeyName]: model.id,
            locale_id: locale.id,
            ...data,
          },
        },
      );
    }

    return this.prismaService[modelName].findUnique({
      where: { id: model.id },
      include: {
        [this.getTableNameTranslations(modelName)]: {
          where: {
            locales: {
              enabled: true,
            },
          },
          include: {
            locales: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });
  }

  async updateModelWithLocales<T extends any>(
    modelName: string,
    foreginKeyName: string,
    id: number,
    data: T,
    locales: Record<string, string>,
  ) {
    for (const localeCode of Object.keys(locales)) {
      const locale = await this.getByCode(localeCode);

      const data: any = {};

      for (const key of Object.keys(locales[localeCode])) {
        data[key] = locales[localeCode][key];
      }

      await this.prismaService[this.getTableNameTranslations(modelName)].upsert(
        {
          where: {
            [`${foreginKeyName}_locale_id`]: {
              [foreginKeyName]: id,
              locale_id: locale.id,
            },
          },
          create: {
            [foreginKeyName]: id,
            locale_id: locale.id,
            ...data,
          },
          update: {
            ...data,
          },
        },
      );
    }

    return this.prismaService[modelName].update({
      where: { id },
      data,
    });
  }
}
