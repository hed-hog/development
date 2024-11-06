import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from './dto/delete.dto';

@Injectable()
export class PersonAddressTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateDTO) {
    return await this.prismaService.person_address_type.create({
      data,
    });
  }

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = [];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_address_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_address_type_locale: {
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
      'person_address_type_locale',
    );
  }

  async get(id: number) {
    const addressType = await this.prismaService.person_address_type.findUnique(
      {
        where: { id },
      },
    );

    if (!addressType) {
      throw new NotFoundException(`addressType with ID ${id} not found`);
    }

    return addressType;
  }

  async update(id: number, data: UpdateDTO) {
    return await this.prismaService.person_address_type.update({
      where: { id },
      data: data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one addressType to delete.`,
      );
    }

    return await this.prismaService.person_address_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
