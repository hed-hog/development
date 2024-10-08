import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';

@Injectable()
export class ScreenService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async updateRoles(screenId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_screens.deleteMany({
      where: {
        screen_id: screenId,
      },
    });

    return this.prismaService.role_screens.createMany({
      data: data.ids.map((roleId) => ({
        screen_id: screenId,
        role_id: roleId,
      })),
      skipDuplicates: true,
    });
  }
  async updateRoutes(screenId: number, { ids }: UpdateIdsDTO) {
    ids = (
      await this.prismaService.routes.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          id: true,
        },
      })
    ).map((route) => route.id);

    await this.prismaService.route_screens.deleteMany({
      where: {
        screen_id: screenId,
      },
    });

    return this.prismaService.route_screens.createMany({
      data: ids.map((routeId) => ({
        screen_id: screenId,
        route_id: routeId,
      })),
      skipDuplicates: true,
    });
  }
  async listRoutes(
    locale: string,
    screenId: number,
    paginationParams: PaginationDTO,
  ) {
    return this.paginationService.paginate(
      this.prismaService.routes,
      paginationParams,
      {
        include: {
          route_screens: {
            where: {
              screen_id: screenId,
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

  async listRoles(
    locale: string,
    screenId: number,
    paginationParams: PaginationDTO,
  ) {
    return this.paginationService.paginate(
      this.prismaService.roles,
      paginationParams,
      {
        include: {
          role_screens: {
            where: {
              screen_id: screenId,
            },
            select: {
              role_id: true,
              screen_id: true,
            },
          },
        },
      },
    );
  }

  async getScreens(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug', 'icon'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const result = await this.paginationService.paginate(
      this.prismaService.screens,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          screen_translations: {
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
        },
      },
      'screen_translations',
    );

    return result;
  }

  async get(screenId: number) {
    return this.prismaService.screens.findUnique({ where: { id: screenId } });
  }

  async create({ name, slug, description, icon }: CreateDTO) {
    return this.prismaService.screens.create({
      data: {
        name,
        slug,
        description,
        icon,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.screens.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one screen to delete.`,
      );
    }

    return this.prismaService.screens.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
