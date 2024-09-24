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

  async listUsers(roleId: number) {
    return this.prismaService.users.findMany({
      where: { role_users: { some: { role_id: roleId } } },
    });
  }

  async listMenus(roleId: number) {
    return this.prismaService.menus.findMany({
      where: { role_menus: { some: { role_id: roleId } } },
    });
  }

  async listRoutes(roleId: number) {
    return this.prismaService.routes.findMany({
      where: { role_routes: { some: { role_id: roleId } } },
    });
  }

  async listScreens(roleId: number) {
    return this.prismaService.screens.findMany({
      where: { role_screens: { some: { role_id: roleId } } },
    });
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
