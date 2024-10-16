import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { itemTranslations } from '@hedhog/utils';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async getSettingFromGroup(locale: any, paginationParams: any, slug: string) {
    const fields = ['slug', 'value'];

    paginationParams.pageSize = 100;

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    let result = await this.paginationService.paginate(
      this.prismaService.settings,
      paginationParams,
      {
        where: {
          AND: {
            setting_groups: {
              slug,
            },
            OR,
          },
        },
        include: {
          setting_groups: {
            include: {
              setting_group_translations: {
                where: {
                  locales: {
                    code: locale,
                  },
                },
                select: {
                  name: true,
                  description: true,
                },
              },
            },
          },
          setting_translations: {
            where: {
              locales: {
                code: locale,
              },
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      'setting_translations',
    );

    result.data = result.data.map((setting: any) => {
      setting.setting_groups = itemTranslations(
        'setting_group_translations',
        setting.setting_groups,
      );
      return setting;
    });

    return result;
  }

  async getSettingGroups(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug', 'icon'];

    paginationParams.pageSize = 100;

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    let result = await this.paginationService.paginate(
      this.prismaService.setting_groups,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          setting_group_translations: {
            where: {
              locales: {
                code: locale,
              },
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      'setting_group_translations',
    );

    return result;
  }

  async getSettings(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug', 'value'];

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    let result = await this.paginationService.paginate(
      this.prismaService.settings,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          setting_groups: {
            include: {
              setting_group_translations: {
                where: {
                  locales: {
                    code: locale,
                  },
                },
                select: {
                  name: true,
                  description: true,
                },
              },
            },
          },
          setting_translations: {
            where: {
              locales: {
                code: locale,
              },
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      'setting_translations',
    );

    result.data = result.data.map((setting: any) => {
      setting.setting_groups = itemTranslations(
        'setting_group_translations',
        setting.setting_groups,
      );
      return setting;
    });

    return result;
  }

  async get(settingId: number) {
    return this.prismaService.settings.findUnique({
      where: { id: settingId },
    });
  }

  async create({}: CreateDTO) {
    return this.prismaService.settings.create({
      data: {},
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.settings.update({
      where: { id },
      data,
    });
  }

  async updateFromSlug(slug: string, data: UpdateDTO) {
    const { id } = await this.prismaService.settings.findFirst({
      where: {
        slug,
      },
    });

    if (!id) {
      throw new BadRequestException(`Setting with slug ${slug} not found.`);
    }

    return this.update({
      id,
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one setting to delete.`,
      );
    }

    return this.prismaService.settings.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
