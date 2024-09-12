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

@Injectable()
export class MenuService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async getMenu(paginationParams: PaginationDTO) {
    const OR: any[] = [
      {
        name: { contains: paginationParams.search, mode: 'insensitive' },
      },
      {
        url: { contains: paginationParams.search, mode: 'insensitive' },
      },
      {
        icon: { contains: paginationParams.search, mode: 'insensitive' },
      },
    ];

    if (!isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

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
