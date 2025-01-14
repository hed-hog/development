import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { itemTranslations } from '@hedhog/core';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { CreateDTO } from './dto/create.dto';
import { OrderDTO } from './dto/order.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class MenuService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) { }

  async updateScreens(menuId: number, data: UpdateIdsDTO) {
    await this.prismaService.menu_screen.deleteMany({
      where: {
        menu_id: menuId,
      },
    });

    return this.prismaService.menu_screen.createMany({
      data: data.ids.map((screenId) => ({
        menu_id: menuId,
        screen_id: screenId,
      })),
      skipDuplicates: true,
    });
  }
  async updateRoles(menuId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_menu.deleteMany({
      where: {
        menu_id: menuId,
      },
    });

    return this.prismaService.role_menu.createMany({
      data: data.ids.map((roleId) => ({
        menu_id: menuId,
        role_id: roleId,
      })),
      skipDuplicates: true,
    });
  }
  async listScreens(
    locale: string,
    menuId: number,
    paginationParams: PaginationDTO,
  ) {
    return this.paginationService.paginate(
      this.prismaService.screen,
      paginationParams,
      {
        include: {
          screen_locale: {
            where: {
              locale: {
                code: locale,
              },
            },
            select: {
              name: true,
            },
          },
          menu_screen: {
            where: {
              menu_id: menuId,
            },
            select: {
              screen_id: true,
              menu_id: true,
            },
          },
        },
      },
      'screen_locale',
    );
  }
  async listRoles(
    locale: string,
    menuId: number,
    paginationParams: PaginationDTO,
  ) {
    return this.paginationService.paginate(
      this.prismaService.role,
      paginationParams,
      {
        include: {
          role_locale: {
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
          role_menu: {
            where: {
              menu_id: menuId,
            },
            select: {
              role_id: true,
              menu_id: true,
            },
          },
        },
      },
      'role_locale',
    );
  }

  async getMenus(locale: string, userId: number, menuId = 0) {
    if (menuId === 0) {
      menuId = null;
    }

    let menu = (await this.prismaService.menu.findMany({
      where: {
        menu_id: menuId,
        role_menu: {
          some: {
            role: {
              role_user: {
                some: {
                  user_id: userId,
                },
              },
            },
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        menu_locale: {
          where: {
            locale: {
              code: locale,
            },
          },
          select: {
            name: true,
          },
        },
      },
    })) as unknown[] as any[];

    menu = menu.map((m) => itemTranslations('menu_locale', m));

    for (let i = 0; i < menu.length; i++) {
      menu[i].menu = await this.getMenus(locale, userId, menu[i].id);
    }

    return menu;
  }

  async getSystemMenu(locale: string, userId: number) {
    return this.getMenus(locale, userId);
  }

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = ['url', 'icon'];
    const OR = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.menu,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          menu_locale: {
            where: {
              locale: {
                code: locale,
              },
            },
            select: {
              name: true,
            },
          },
        },
      },
      'menu_locale',
    );
  }

  async get(menuId: number) {
    return this.prismaService.menu.findUnique({
      where: { id: menuId },
    });
  }

  async create({ slug, url, icon, order, menuId }: CreateDTO) {
    return this.prismaService.menu.create({
      data: { slug, url, icon, order, menu_id: menuId },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.menu.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one menu to delete.`,
      );
    }

    return this.prismaService.menu.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async updateOrder({ ids }: OrderDTO): Promise<void> {
    const count = await this.prismaService.menu.count({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (count !== ids.length) {
      throw new BadRequestException('IDs inválidos.');
    }

    await Promise.all(
      ids.map((id, index) =>
        this.prismaService.menu.update({
          where: { id },
          data: { order: index + 1 },
        }),
      ),
    );
  }
}
