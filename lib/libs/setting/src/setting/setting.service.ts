import { FileService } from '@hedhog/file';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { itemTranslations } from '@hedhog/utils';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Response } from 'express';
import { DeleteDTO } from './dto/delete.dto';
import { CreateDTO } from './dto/create.dto';
import { SettingDTO } from './dto/setting.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class SettingService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  async getAppearanceCSS(res: Response) {
    const fileCSS = await this.fileService.readStream(`appearance/theme.css`);

    res.setHeader('Content-Type', 'text/css');

    return fileCSS.pipe(res);
  }

  async updateAppearanceSettings() {
    console.log({ updateAppearanceSettings: 'updateAppearanceSettings' });

    const settings = await this.prismaService.setting.findMany({
      where: {
        setting_group: {
          slug: 'appearance',
        },
      },
    });

    await this.fileService.uploadFromString(
      'appearance',
      'theme.css',
      `
        @layer base {
          :root {
            --background: 0 0% 100%;
            --foreground: 20 14.3% 4.1%;
            --card: 0 0% 100%;
            --card-foreground: 20 14.3% 4.1%;
            --popover: 0 0% 100%;
            --popover-foreground: 20 14.3% 4.1%;
            --primary: 24.6 95% 53.1%;
            --primary-foreground: 60 9.1% 97.8%;
            --secondary: 60 4.8% 95.9%;
            --secondary-foreground: 24 9.8% 10%;
            --muted: 60 4.8% 95.9%;
            --muted-foreground: 25 5.3% 44.7%;
            --accent: 60 4.8% 95.9%;
            --accent-foreground: 24 9.8% 10%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 60 9.1% 97.8%;
            --border: 20 5.9% 90%;
            --input: 20 5.9% 90%;
            --ring: 24.6 95% 53.1%;
            --radius: 0.5rem;
            --chart-1: 12 76% 61%;
            --chart-2: 173 58% 39%;
            --chart-3: 197 37% 24%;
            --chart-4: 43 74% 66%;
            --chart-5: 27 87% 67%;
          }

          .dark {
            --background: 20 14.3% 4.1%;
            --foreground: 60 9.1% 97.8%;
            --card: 20 14.3% 4.1%;
            --card-foreground: 60 9.1% 97.8%;
            --popover: 20 14.3% 4.1%;
            --popover-foreground: 60 9.1% 97.8%;
            --primary: 20.5 90.2% 48.2%;
            --primary-foreground: 60 9.1% 97.8%;
            --secondary: 12 6.5% 15.1%;
            --secondary-foreground: 60 9.1% 97.8%;
            --muted: 12 6.5% 15.1%;
            --muted-foreground: 24 5.4% 63.9%;
            --accent: 12 6.5% 15.1%;
            --accent-foreground: 60 9.1% 97.8%;
            --destructive: 0 72.2% 50.6%;
            --destructive-foreground: 60 9.1% 97.8%;
            --border: 12 6.5% 15.1%;
            --input: 12 6.5% 15.1%;
            --ring: 20.5 90.2% 48.2%;
            --chart-1: 220 70% 50%;
            --chart-2: 160 60% 45%;
            --chart-3: 30 80% 55%;
            --chart-4: 280 65% 60%;
            --chart-5: 340 75% 55%;
          }
        }
      `,
      'text/css',
    );

    console.log({ settings });
  }

  async setManySettings(data: SettingDTO) {
    const transaction = [];

    for (const { slug, value } of data.setting) {
      transaction.push(
        this.prismaService.setting.updateMany({
          where: {
            slug,
          },
          data: {
            value,
          },
        }),
      );
    }

    await this.prismaService.$transaction(transaction);

    const hasAppearance = await this.prismaService.setting.count({
      where: {
        slug: {
          in: data.setting.map((setting) => setting.slug),
        },
        setting_group: {
          slug: 'appearance',
        },
      },
    });

    if (hasAppearance) {
      await this.updateAppearanceSettings();
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
      this.prismaService.setting,
      paginationParams,
      {
        where: {
          AND: {
            setting_group: {
              slug,
            },
            OR,
          },
        },
        include: {
          setting_group: {
            include: {
              setting_group_locale: {
                where: {
                  locale: {
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
          setting_locale: {
            where: {
              locale: {
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
      'setting_locale',
    );

    result.data = result.data.map((setting: any) => {
      setting.setting_group = itemTranslations(
        'setting_group_locale',
        setting.setting_group,
      );
      return setting;
    });

    return result;
  }

  async listSettingGroups(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug', 'icon'];

    paginationParams.pageSize = 100;

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const result = await this.paginationService.paginate(
      this.prismaService.setting_group,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          setting_group_locale: {
            where: {
              locale: {
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
      'setting_group_locale',
    );

    return result;
  }

  async listSettings(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug', 'value'];

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const result = await this.paginationService.paginate(
      this.prismaService.setting,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          setting_group: {
            include: {
              setting_group_locale: {
                where: {
                  locale: {
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
          setting_locale: {
            where: {
              locale: {
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
      'setting_locale',
    );

    result.data = result.data.map((setting: any) => {
      setting.setting_group = itemTranslations(
        'setting_group_locale',
        setting.setting_group,
      );
      return setting;
    });

    return result;
  }

  async get(settingId: number) {
    return this.prismaService.setting.findUnique({
      where: { id: settingId },
    });
  }

  async create({}: CreateDTO) {
    return this.prismaService.setting.create({
      data: {},
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.setting.update({
      where: { id },
      data,
    });
  }

  async updateFromSlug(slug: string, data: UpdateDTO) {
    const { id } = await this.prismaService.setting.findFirst({
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

    return this.prismaService.setting.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async setSettingUserValue(user_id: number, slug: string, value: string) {
    const user = await this.prismaService.user.findUnique({
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

    const setting = await this.prismaService.setting.findFirst({
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

    return await this.prismaService.setting_user.upsert({
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

    let setting = await this.prismaService.setting.findMany({
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

    const slugUserOverride = setting.filter((setting) => setting.userOverride);

    const settingUser = await this.prismaService.setting_user.findMany({
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

    setting.forEach((setting) => {
      data[setting.slug] = setting.value;
    });

    settingUser.forEach((setting) => {
      data[slugUserOverride.find((s) => s.id === setting.setting_id).slug] =
        setting.value;
    });

    return data;
  }
}
