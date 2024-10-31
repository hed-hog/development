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
    return await this.prismaService.person_address_type.create({
      data,
    });
  }

  async getAddressTypes(locale: string, paginationParams: PaginationDTO) {
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

  async getAddressTypeById(id: number) {
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

  async update(id: number, data: UpdateAddressTypeDTO) {
    return await this.prismaService.person_address_type.update({
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

    return await this.prismaService.person_address_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
