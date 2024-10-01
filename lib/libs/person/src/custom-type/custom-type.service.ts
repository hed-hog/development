import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomTypeDTO } from './dto/create-custom-type.dto';
import { UpdateCustomTypeDTO } from './dto/update-custom-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Injectable()
export class CustomTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateCustomTypeDTO) {
    return await this.prismaService.person_custom_types.create({
      data,
    });
  }

  async getcustomTypes(paginationParams: PaginationDTO) {
    const fields = ['name'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_custom_types,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getcustomTypeById(id: number) {
    const customType = await this.prismaService.person_custom_types.findUnique({
      where: { id },
    });

    if (!customType) {
      throw new NotFoundException(`customType with ID ${id} not found`);
    }

    return customType;
  }

  async update(id: number, data: UpdateCustomTypeDTO) {
    return await this.prismaService.person_custom_types.update({
      where: { id },
      data: data,
    });
  }

  async remove({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one customType to delete.`,
      );
    }

    return await this.prismaService.person_custom_types.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
