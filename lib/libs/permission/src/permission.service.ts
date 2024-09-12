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
export class PermissionService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async getPermissions(paginationParams: PaginationDTO) {
    const OR: any[] = [
      {
        name: { contains: paginationParams.search, mode: 'insensitive' },
      },
      {
        description: { contains: paginationParams.search, mode: 'insensitive' },
      },
    ];

    if (!isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

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

  async get(permissionId: number) {
    return this.prismaService.roles.findUnique({
      where: { id: permissionId },
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
