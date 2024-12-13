import path = require('path');
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { itemTranslations } from '@hedhog/core';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DeleteDTO } from './dto/delete.dto';
import { CreateDTO } from './dto/create.dto';
import { SettingDTO } from './dto/setting.dto';
import { UpdateDTO } from './dto/update.dto';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

@Injectable()
export class SettingService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  hexToHSL(hex: string) {
    hex = hex && hex.includes('#') ? hex.replace(/^#/, '') : '#000';
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
  }

  parseSlugAndValue(slug: string, value: any) {
    const parsedSlug = slug.replace('theme-', '--');
    switch (slug) {
      case 'theme-font':
        return `--font-family: ${value};`;

      case 'theme-text-size': {
        const baseSize = parseFloat(value);
        const sizes = {
          '--text-size-xs': `${(baseSize * 0.75).toFixed(2)}rem`,
          '--text-size-sm': `${(baseSize * 0.875).toFixed(2)}rem`,
          '--text-size-md': `${baseSize.toFixed(2)}rem`,
          '--text-size-base': `${baseSize.toFixed(2)}rem`,
          '--text-size-lg': `${(baseSize * 1.125).toFixed(2)}rem`,
          '--text-size-xl': `${(baseSize * 1.25).toFixed(2)}rem`,
          '--text-size-2xl': `${(baseSize * 1.5).toFixed(2)}rem`,
          '--text-size-3xl': `${(baseSize * 1.875).toFixed(2)}rem`,
        };

        return Object.entries(sizes)
          .map(([sizeKey, sizeValue]) => `${sizeKey}: ${sizeValue};`)
          .join('\n');
      }

      case 'theme-primary':
      case 'theme-primary-foreground':
      case 'theme-secondary':
      case 'theme-secondary-foreground':
      case 'theme-muted':
      case 'theme-muted-foreground':
      case 'theme-accent':
      case 'theme-accent-foreground': {
        const { h, s, l } = this.hexToHSL(value);
        return `${parsedSlug}: ${h} ${s}% ${l}%;`;
      }

      case 'theme-radius':
        return `${parsedSlug}: ${value}rem;`;

      default:
        return `${parsedSlug}:${value};`;
    }
  }

  async handleIndexStyleFile() {
    const cssIndexPath = path.join('storage', 'files', 'index.css');
    if (existsSync(cssIndexPath)) {
      return readFile(cssIndexPath, 'utf8');
    } else {
      return '';
    }
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
      const cssVariables = data.setting
        .map(({ slug, value }) => this.parseSlugAndValue(slug, value))
        .join('\n');

      const cssContent = `:root {\n${cssVariables}\n}\n .dark {\n${cssVariables}\n}\n}\n .light {\n${cssVariables}\n}\n}`;

      try {
        await writeFile(
          path.join('storage', 'files', 'index.css'),
          cssContent,
          'utf8',
        );
        console.log('CSS variables written to src/index.css');
      } catch (error) {
        console.error('Failed to write CSS variables:', error);
        throw new Error('Could not write CSS variables to file.');
      }

      return { success: true };
    }
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

  async create(data: CreateDTO) {
    return this.prismaService.setting.create({
      data,
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

    const slugUserOverride = setting.filter((setting) => setting.user_override);

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
