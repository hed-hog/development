import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

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
      this.prismaService.route,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getRouteById(routeId: number) {
    return this.prismaService.route.findUnique({ where: { id: routeId } });
  }

  async create({ url, method }: CreateDTO) {
    return this.prismaService.route.create({ data: { url, method } });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.route.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    return this.prismaService.route.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async listRoles(
    locale: string,
    routeId: number,
    paginationParams: PaginationDTO,
  ) {
    return this.paginationService.paginate(
      this.prismaService.role,
      paginationParams,
      {
        include: {
          role_translations: {
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
      'role_translations',
    );
  }

  async updateRoles(routeId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_route.deleteMany({
      where: {
        route_id: routeId,
      },
    });

    return this.prismaService.role_route.createMany({
      data: data.ids.map((roleId) => ({
        role_id: roleId,
        route_id: routeId,
      })),
      skipDuplicates: true,
    });
  }

  async listScreens(
    locale: string,
    routeId: number,
    paginationParams: PaginationDTO,
  ) {
    return this.paginationService.paginate(
      this.prismaService.screen,
      paginationParams,
      {
        include: {
          screen_translations: {
            where: {
              locales: {
                code: locale,
              },
            },
            select: {
              name: true,
            },
          },
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
      'screen_translations',
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
