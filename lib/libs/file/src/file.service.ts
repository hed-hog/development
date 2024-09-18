import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DeleteDTO } from './dto/delete.dto';

@Injectable()
export class FileService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async getFiles(paginationParams: PaginationDTO) {
    const OR: any[] = [
      {
        name: { contains: paginationParams.search },
      },
      {
        url: { contains: paginationParams.search },
      },
      {
        extension: { contains: paginationParams.search },
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
      this.prismaService.files,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(fileId: number) {
    return this.prismaService.files.findUnique({
      where: { id: fileId },
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one file to delete.`,
      );
    }

    return this.prismaService.files.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
