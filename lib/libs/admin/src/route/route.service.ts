import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateDTO } from './dto/update.dto';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';

@Injectable()
export class RouteService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async getRoutes(paginationParams: PaginationDTO) {
    const fields = ['url', 'method'];

    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.routes,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getRouteById(routeId: number) {
    return this.prismaService.routes.findUnique({ where: { id: routeId } });
  }

  async create({ url, method }: CreateDTO) {
    return this.prismaService.routes.create({ data: { url, method } });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.routes.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    return this.prismaService.routes.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async listRoles(routeId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.roles,
      paginationParams,
      {
        include: {
          role_routes: {
            where: {
              route_id: routeId,
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

  async updateRoles(routeId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_routes.deleteMany({
      where: {
        route_id: routeId,
      },
    });

    return this.prismaService.role_routes.createMany({
      data: data.ids.map((roleId) => ({
        role_id: roleId,
        route_id: routeId,
      })),
      skipDuplicates: true,
    });
  }

  async listScreens(routeId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.screens,
      paginationParams,
      {
        include: {
          route_screens: {
            where: {
              route_id: routeId,
            },
            select: {
              route_id: true,
              screen_id: true,
            },
          },
        },
      },
    );
  }

  async updateScreens(routeId: number, data: UpdateIdsDTO) {
    await this.prismaService.route_screens.deleteMany({
      where: {
        route_id: routeId,
      },
    });

    return this.prismaService.route_screens.createMany({
      data: data.ids.map((screenId) => ({
        screen_id: screenId,
        route_id: routeId,
      })),
      skipDuplicates: true,
    });
  }
}
