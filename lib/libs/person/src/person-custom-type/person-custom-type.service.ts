import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteDTO } from './dto/delete.dto';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class PersonCustomTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateDTO) {
    return await this.prismaService.person_custom_type.create({
      data,
    });
  }

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = ['slug'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_custom_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_custom_type_locale: {
            where: {
              locale: {
                code: locale,
              },
            },
            select: {
              name: true,
            },
          },
        },
      },
      'person_custom_type_locale',
    );
  }

  async get(id: number) {
    const customType = await this.prismaService.person_custom_type.findUnique({
      where: { id },
    });

    if (!customType) {
      throw new NotFoundException(`customType with ID ${id} not found`);
    }

    return customType;
  }

  async update(id: number, data: UpdateDTO) {
    return await this.prismaService.person_custom_type.update({
      where: { id },
      data: data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one customType to delete.`,
      );
    }

    return await this.prismaService.person_custom_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
