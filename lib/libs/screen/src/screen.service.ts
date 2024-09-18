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

@Injectable()
export class ScreenService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async getScreens(paginationParams: PaginationDTO) {
    const OR: any[] = [
      {
        name: { contains: paginationParams.search },
      },
      {
        slug: { contains: paginationParams.search },
      },
      {
        description: { contains: paginationParams.search },
      },
      {
        icon: { contains: paginationParams.search },
      },
    ];

    if (this.prismaService.getProvider() === 'postgres') {
      for (let i = 0; i < OR.length; i++) {
        for (let x = 0; x < Object.keys(OR[i]).length; x++) {
          OR[i][Object.keys(OR[i])[x]].insensitive = true;
        }
      }
    }

    if (!isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.screens,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
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
