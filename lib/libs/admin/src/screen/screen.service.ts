import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class ScreenService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async updateRoles(screenId: number, data: UpdateIdsDTO) {
    await this.prismaService.role_screen.deleteMany({
      where: {
        screen_id: screenId,
      },
    });

    return this.prismaService.role_screen.createMany({
      data: data.ids.map((roleId) => ({
        screen_id: screenId,
        role_id: roleId,
      })),
      skipDuplicates: true,
    });
  }
  async updateRoutes(screenId: number, { ids }: UpdateIdsDTO) {
    ids = (
      await this.prismaService.route.findMany({
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

    await this.prismaService.route_screen.deleteMany({
      where: {
        screen_id: screenId,
      },
    });

    return this.prismaService.route_screen.createMany({
      data: ids.map((routeId) => ({
        screen_id: screenId,
        route_id: routeId,
      })),
      skipDuplicates: true,
    });
  }
  async listRoutes(screenId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.route,
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
      this.prismaService.role,
      paginationParams,
      {
        include: {
          role_screen: {
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
      this.prismaService.screen,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          screen_locale: {
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
      'screen_locale',
    );

    return result;
  }

  async get(screenId: number) {
    return this.prismaService.screen.findUnique({ where: { id: screenId } });
  }

  async create({ name, slug, description, icon }: CreateDTO) {
    return this.prismaService.screen.create({
      data: {
        name,
        slug,
        description,
        icon,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.screen.update({
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

    return this.prismaService.screen.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
