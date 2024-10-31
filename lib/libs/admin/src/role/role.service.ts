import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { getWithLocale } from '@hedhog/utils';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { LocaleService } from '../locale';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
  ) {}

  async updateUsers(roleId: number, { ids }: UpdateIdsDTO) {
    await this.prismaService.role_user.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_user.createMany({
      data: ids.map((userId) => ({
        role_id: roleId,
        user_id: userId,
      })),
      skipDuplicates: true,
    });
  }

  async updateScreens(roleId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_screen.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_screen.createMany({
      data: data.ids.map((screenId) => ({
        role_id: roleId,
        screen_id: screenId,
      })),
      skipDuplicates: true,
    });
  }

  async updateRoutes(roleId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_route.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_route.createMany({
      data: data.ids.map((routeId) => ({
        role_id: roleId,
        route_id: routeId,
      })),
      skipDuplicates: true,
    });
  }

  async updateMenus(roleId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_menu.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_menu.createMany({
      data: data.ids.map((menuId) => ({
        role_id: roleId,
        menu_id: menuId,
      })),
      skipDuplicates: true,
    });
  }

  async listUsers(roleId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.user,
      paginationParams,
      {
        include: {
          role_user: {
            where: {
              role_id: roleId,
            },
            select: {
              user_id: true,
              role_id: true,
            },
          },
        },
      },
    );
  }

  async listMenus(
    locale: string,
    roleId: number,
    paginationParams: PaginationDTO,
  ) {
    return this.paginationService.paginate(
      this.prismaService.menu,
      paginationParams,
      {
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
          role_menu: {
            where: {
              role_id: roleId,
            },
            select: {
              menu_id: true,
              role_id: true,
            },
          },
        },
      },
      'menu_locale',
    );
  }

  async listRoutes(roleId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.route,
      paginationParams,
      {
        include: {
          role_route: {
            where: {
              role_id: roleId,
            },
            select: {
              route_id: true,
              role_id: true,
            },
          },
        },
      },
    );
  }

  async listScreens(
    locale: string,
    roleId: number,
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
          role_screen: {
            where: {
              role_id: roleId,
            },
            select: {
              screen_id: true,
              role_id: true,
            },
          },
        },
      },
      'screen_locale',
    );
  }

  async getRoles(locale: string, paginationParams: PaginationDTO) {
    const fields = [];

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.role,
      paginationParams,
      {
        where: {
          OR,
        },
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
        },
      },
      'role_locale',
    );
  }

  async get(locale: string, roleId: number) {
    return getWithLocale(
      locale,
      'role_locale',
      await this.prismaService.role.findUnique({
        where: { id: roleId },
        include: {
          role_locale: {
            where: {
              locale: {
                enabled: true,
              },
            },
            select: {
              name: true,
              description: true,
              locale: {
                select: {
                  code: true,
                },
              },
            },
          },
        },
      }),
    );
  }

  async create({ slug, locale }: CreateDTO) {
    return this.localeService.createModelWithLocale(
      'role',
      'role_id',
      { slug },
      locale,
    );
  }

  async update({
    id,
    data: { locale, slug },
  }: {
    id: number;
    data: UpdateDTO;
  }) {
    return this.localeService.updateModelWithLocale(
      'role',
      'role_id',
      id,
      { slug },
      locale,
    );
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one permission to delete.`,
      );
    }

    return this.prismaService.role.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
