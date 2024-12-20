import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { itemTranslations } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';
const path = require('path');
import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';

@Injectable()
export class AppearanceService {
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

      case 'menu-width':
        return `--menu-width: ${value}rem;`;

      case 'system-name':
      case 'system-slogan':
      case 'image-url':
      case 'icon-url':
        return `--${slug}: '${value}';`;

      default:
        return `${parsedSlug}:${value};`;
    }
  }

  async getAppearanceFromGroup(locale: any, paginationParams: any) {
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
              slug: 'appearance',
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

  async handleIndexStyleFile() {
    const storagePath = path.join('storage');
    const filesPath = path.join(storagePath, 'files');
    const cssIndexPath = path.join(filesPath, 'index.css');

    if (existsSync(cssIndexPath)) {
      return readFile(cssIndexPath, 'utf8');
    } else {
      return '';
    }
  }

  async setManySettings(data: UpdateDTO) {
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

      const cssContent = `:root {\n${cssVariables}\n}\n .dark {\n${cssVariables}\n}\n .light {\n${cssVariables}\n}`;

      try {
        if (!existsSync(path.join('storage', 'files'))) {
          await mkdir(path.join('storage', 'files'), { recursive: true });
        }

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
}
