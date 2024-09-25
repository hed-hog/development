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
import { UpdateIdsDTO } from '../dto/update-ids.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async updateUsers(roleId: number, { ids }: UpdateIdsDTO) {
    await this.prismaService.role_users.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_users.createMany({
      data: ids.map((userId) => ({
        role_id: roleId,
        user_id: userId,
      })),
      skipDuplicates: true,
    });
  }

  async updateScreens(roleId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_screens.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_screens.createMany({
      data: data.ids.map((screenId) => ({
        role_id: roleId,
        screen_id: screenId,
      })),
      skipDuplicates: true,
    });
  }

  async updateRoutes(roleId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_routes.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_routes.createMany({
      data: data.ids.map((routeId) => ({
        role_id: roleId,
        route_id: routeId,
      })),
      skipDuplicates: true,
    });
  }

  async updateMenus(roleId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_menus.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    return this.prismaService.role_menus.createMany({
      data: data.ids.map((menuId) => ({
        role_id: roleId,
        menu_id: menuId,
      })),
      skipDuplicates: true,
    });
  }

  async listUsers(paginationParams: PaginationDTO, roleId: number) {
    return this.paginationService.paginate(
      this.prismaService.users,
      paginationParams,
      {
        include: {
          role_users: {
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

  async listMenus(paginationParams: PaginationDTO, roleId: number) {
    return this.paginationService.paginate(
      this.prismaService.menus,
      paginationParams,
      {
        include: {
          role_menus: {
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
    );
  }

  async listRoutes(paginationParams: PaginationDTO, roleId: number) {
    return this.paginationService.paginate(
      this.prismaService.routes,
      paginationParams,
      {
        include: {
          role_routes: {
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

  async listScreens(paginationParams: PaginationDTO, roleId: number) {
    return this.paginationService.paginate(
      this.prismaService.screens,
      paginationParams,
      {
        include: {
          role_screens: {
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
    );
  }

  async getRoles(paginationParams: PaginationDTO) {
    const fields = ['name', 'description'];

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.roles,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(roleId: number) {
    return this.prismaService.roles.findUnique({
      where: { id: roleId },
    });
  }

  async create({ name, description }: CreateDTO) {
    return this.prismaService.roles.create({
      data: {
        name,
        description,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.roles.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one permission to delete.`,
      );
    }

    return this.prismaService.roles.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
