import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpMethod } from '../enums/http-method.enum';
import { UpdateDTO } from './dto/update.dto';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';

@Injectable()
export class RouteService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async getRoutes(paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.routes,
      paginationParams,
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
      where: {
        id,
      },
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
}
