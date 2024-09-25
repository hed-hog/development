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
import { OrderDTO } from './dto/order.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';

@Injectable()
export class MenuService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async updateScreens(menuId: number, data: UpdateIdsDTO) {
    await this.prismaService.menu_screens.deleteMany({
      where: {
        menu_id: menuId,
      },
    });

    return this.prismaService.menu_screens.createMany({
      data: data.ids.map((screenId) => ({
        menu_id: menuId,
        screen_id: screenId,
      })),
      skipDuplicates: true,
    });
  }
  async updateRoles(menuId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_menus.deleteMany({
      where: {
        menu_id: menuId,
      },
    });

    return this.prismaService.role_menus.createMany({
      data: data.ids.map((roleId) => ({
        menu_id: menuId,
        role_id: roleId,
      })),
      skipDuplicates: true,
    });
  }
  async listScreens(paginationParams: PaginationDTO, menuId: number) {
    return this.paginationService.paginate(
      this.prismaService.screens,
      paginationParams,
      {
        include: {
          menu_screens: {
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
    );
  }
  async listRoles(paginationParams: PaginationDTO, menuId: number) {
    return this.paginationService.paginate(
      this.prismaService.roles,
      paginationParams,
      {
        include: {
          role_menus: {
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
    );
  }

  async getMenus(userId: number, menuId = 0) {
    if (menuId === 0) {
      menuId = null;
    }

    const menus = (await this.prismaService.menus.findMany({
      where: {
        menu_id: menuId,
        role_menus: {
          some: {
            roles: {
              role_users: {
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
    })) as unknown[] as any[];

    for (let i = 0; i < menus.length; i++) {
      menus[i].menus = await this.getMenus(userId, menus[i].id);
    }

    return menus;
  }

  async getSystemMenu(userId: number) {
    return this.getMenus(userId);
  }

  async getMenu(paginationParams: PaginationDTO) {
    const fields = ['name', 'url', 'icon'];
    const OR = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.menus,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(menuId: number) {
    return this.prismaService.menus.findUnique({
      where: { id: menuId },
    });
  }

  async create({ name, url, icon, order, menuId }: CreateDTO) {
    return this.prismaService.menus.create({
      data: { name, url, icon, order, menu_id: menuId },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.menus.update({
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

    return this.prismaService.menus.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async updateOrder({ ids }: OrderDTO): Promise<void> {
    const count = await this.prismaService.menus.count({
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
        this.prismaService.menus.update({
          where: { id },
          data: { order: index + 1 },
        }),
      ),
    );
  }
}
