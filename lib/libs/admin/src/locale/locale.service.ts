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

    await this.prismaService.locales.updateMany({
      where: {
        enabled: true,
      },
      data: {
        enabled: false,
      },
    });

    return this.prismaService.locales.updateMany({
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
      this.prismaService.locales,
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

    const values = await this.prismaService.translations.findMany({
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

    const values = await this.prismaService.translations.findMany({
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
      this.prismaService.locales,
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

    const values = await this.prismaService.translations.findMany({
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

  async getById(localesId: number) {
    return this.prismaService.locales.findUnique({
      where: { id: localesId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.locales.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.locales.update({
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

    return this.prismaService.locales.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
