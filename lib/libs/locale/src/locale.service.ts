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

  async getTranslations(localeCode: string, namespace: string) {
    if (!localeCode) {
      throw new BadRequestException('Locale code is required.');
    }

    if (!namespace) {
      namespace = 'translation';
    }

    const localeCodes = localeCode.toLowerCase().split('-');
    const code = localeCodes[0];
    const region = localeCodes[1];
    const where: any = {
      locales: {
        code,
      },
      translation_namespaces: {
        name: namespace,
      },
    };

    if (localeCodes.length > 1) {
      where.locale.region = region;
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

  async get(paginationParams: PaginationDTO) {
    const OR: any[] = [
      {
        name: { contains: paginationParams.search, mode: 'insensitive' },
      },
    ];

    if (!isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.locales,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
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
