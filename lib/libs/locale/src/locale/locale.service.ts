import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
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

  parseLocale(locale: string) {
    const localeCodes = locale.toLowerCase().split('-');
    const code = localeCodes[0];
    const region = localeCodes[1];
    return {
      code,
      region,
      locale: localeCodes,
    };
  }

  async enabledLocalesMap() {
    const enabledLocales = await this.getEnables('en', {
      search: '',
      pageSize: 10,
      page: 1,
      sortField: 'code',
      sortOrder: PageOrderDirection.Asc,
      fields: 'code,id',
    });

    return enabledLocales.data.reduce(
      (acc, locale: any) => {
        acc[locale.code] = locale.id;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  async getEnables(currentLocale: string, paginationParams: PaginationDTO) {
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

    const { code, region, locale } = this.parseLocale(currentLocale);

    const where: any = {
      locale: {
        code,
      },
      translation_namespace: {
        name: 'translation',
      },
    };

    if (locale.length > 1) {
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

  async getTranslations(localeCode: string, namespace: string) {
    if (!localeCode) {
      throw new BadRequestException('Locale code is required.');
    }

    if (!namespace) {
      namespace = 'translation';
    }

    const { code, region, locale } = this.parseLocale(localeCode);
    const where: any = {
      locale: {
        code,
      },
      translation_namespace: {
        name: namespace,
      },
    };

    if (locale.length > 1) {
      where.locale.region = region;
    }

    const values = await this.prismaService.translation.findMany({
      where,
      select: {
        name: true,
        value: true,
      },
    });

    const translation = {};

    for (const value of values) {
      translation[value.name] = value.value;
    }

    return translation;
  }

  async list(currentLocale: string, paginationParams: PaginationDTO) {
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

    const { code, region, locale } = this.parseLocale(currentLocale);

    const where: any = {
      locale: {
        code,
      },
      translation_namespace: {
        name: 'translation',
      },
    };

    if (locale.length > 1) {
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

  async get(localeId: number) {
    return this.prismaService.locale.findUnique({
      where: { id: localeId },
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
    return `${modelName}_locale`;
  }

  async createModelWithLocale<T>(
    modelName: string,
    foreignKeyName: string,
    data: T,
  ) {
    try {
      const model = await this.prismaService[modelName].create({
        data: this.getValidData(modelName, data),
      });

      const { locale } = data as {
        locale: Record<string, Record<string, string>>;
      };

      if (locale) {
        await Promise.all(
          Object.entries(locale).map(async ([localeCode, localeData]) => {
            const localeRecord = await this.getByCode(localeCode);
            const localeEntry = {
              [foreignKeyName]: model.id,
              locale_id: localeRecord.id,
              ...localeData,
            };

            await this.prismaService[
              this.getTableNameTranslations(modelName)
            ].create({
              data: localeEntry,
            });
          }),
        );
      }

      return this.prismaService[modelName].findUnique({
        where: { id: model.id },
        include: {
          [this.getTableNameTranslations(modelName)]: {
            where: { locale: { enabled: true } },
            include: { locale: { select: { code: true } } },
          },
        },
      });
    } catch (error: any) {
      if (error.message.includes('Unique constraint failed')) {
        throw new BadRequestException('Data already exists.');
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  getValidData(modelName: string, data: any) {
    const validData: any = {};

    for (const fieldName of Object.keys(this.prismaService[modelName].fields)) {
      validData[fieldName] = data[fieldName];
    }

    return validData;
  }

  async updateModelWithLocale<T>(
    modelName: string,
    foreignKeyName: string,
    id: number,
    data: T,
  ) {
    try {
      const { locale } = data as {
        locale: Record<string, Record<string, string>>;
      };

      if (locale) {
        await Promise.all(
          Object.entries(locale).map(async ([localeCode, localeData]) => {
            const localeRecord = await this.getByCode(localeCode);

            const localeEntry = {
              [foreignKeyName]: id,
              locale_id: localeRecord.id,
              ...localeData,
            };

            await this.prismaService[
              this.getTableNameTranslations(modelName)
            ].upsert({
              where: {
                [`${foreignKeyName}_locale_id`]: {
                  [foreignKeyName]: id,
                  locale_id: localeRecord.id,
                },
              },
              create: localeEntry,
              update: localeData,
            });
          }),
        );
      }

      return this.prismaService[modelName].update({
        where: { id },
        data: this.getValidData(modelName, data),
      });
    } catch (error: any) {
      if (error.message.includes('Unique constraint failed')) {
        throw new BadRequestException('Data already exists.');
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  async getModelWithLocale(modelName: string, id: number) {
    try {
      const model = await this.prismaService[modelName].findUnique({
        where: { id },
        include: {
          [this.getTableNameTranslations(modelName)]: {
            where: { locale: { enabled: true } },
            include: { locale: { select: { code: true } } },
          },
        },
      });

      const localeData = model[this.getTableNameTranslations(modelName)].reduce(
        (acc, item) => {
          acc[item.locale.code] = { name: item.name };
          return acc;
        },
        {} as Record<string, { name: string }>,
      );

      return {
        ...model,
        locale: localeData,
      };
    } catch (error: any) {
      if (error.message.includes('Unique constraint failed')) {
        throw new BadRequestException('Data already exists.');
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
