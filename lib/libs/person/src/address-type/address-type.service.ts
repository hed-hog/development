import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressTypeDTO } from './dto/create-address-type.dto';
import { UpdateAddressTypeDTO } from './dto/update-address-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Injectable()
export class AddressTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateAddressTypeDTO) {
    return await this.prismaService.person_address_types.create({
      data,
    });
  }

  async getAddressTypes(paginationParams: PaginationDTO) {
    const fields = ['name'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_address_types,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getAddressTypeById(id: number) {
    const addressType =
      await this.prismaService.person_address_types.findUnique({
        where: { id },
      });

    if (!addressType) {
      throw new NotFoundException(`addressType with ID ${id} not found`);
    }

    return addressType;
  }

  async update(id: number, data: UpdateAddressTypeDTO) {
    return await this.prismaService.person_address_types.update({
      where: { id },
      data: data,
    });
  }

  async remove({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one addressType to delete.`,
      );
    }

    return await this.prismaService.person_address_types.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
