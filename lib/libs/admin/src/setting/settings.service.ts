import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { itemTranslations } from '@hedhog/utils';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DeleteDTO } from '../dto/delete.dto';
import { CreateDTO } from './dto/create.dto';
import { SettingsDTO } from './dto/settings.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async setManySettings(data: SettingsDTO) {
    for (const { slug, value } of data.settings) {
      await this.prismaService.settings.updateMany({
        where: {
          slug,
        },
        data: {
          value,
        },
      });
    }

    return { success: true };
  }

  async getSettingFromGroup(locale: any, paginationParams: any, slug: string) {
    const fields = ['slug', 'value'];

    paginationParams.pageSize = 100;

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const result = await this.paginationService.paginate(
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

    const result = await this.paginationService.paginate(
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

    const result = await this.paginationService.paginate(
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

  async setSettingUserValue(user_id: number, slug: string, value: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new BadRequestException(`User with id ${user_id} not found.`);
    }

    const setting = await this.prismaService.settings.findFirst({
      where: {
        slug,
        user_override: true,
      },
    });

    if (!setting) {
      throw new BadRequestException(
        `Setting with slug ${slug} not found or user can not override.`,
      );
    }

    return await this.prismaService.setting_users.upsert({
      where: {
        user_id_setting_id: {
          setting_id: setting.id,
          user_id: user.id,
        },
      },
      create: {
        setting_id: setting.id,
        value,
        user_id: user.id,
      },
      update: {
        value,
      },
      select: {
        setting_id: true,
        user_id: true,
        value: true,
      },
    });
  }

  async getSettingValues(slug: string | string[]) {
    slug = Array.isArray(slug) ? slug : [slug];

    let settings = await this.prismaService.settings.findMany({
      where: {
        slug: {
          in: slug,
        },
      },
      select: {
        id: true,
        value: true,
        slug: true,
        type: true,
        user_override: true,
      },
    });

    const slugUserOverride = settings.filter((setting) => setting.userOverride);

    const settingsUser = await this.prismaService.setting_users.findMany({
      where: {
        setting_id: {
          in: slugUserOverride.map((setting) => setting.id),
        },
      },
      select: {
        value: true,
        setting_id: true,
      },
    });

    const data: Record<string, any> = {};

    settings.forEach((setting) => {
      data[setting.slug] = setting.value;
    });

    settingsUser.forEach((setting) => {
      data[slugUserOverride.find((s) => s.id === setting.setting_id).slug] =
        setting.value;
    });

    return data;
  }
}
