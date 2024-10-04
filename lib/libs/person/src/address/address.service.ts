import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonAddressDTO } from './dto/create-address.dto';
import { UpdatePersonAddressDTO } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreatePersonAddressDTO) {
    return this.prismaService.person_addresses.create({
      data: {
        person_id: personId,
        country_id: data.country_id,
        ...data,
      },
    });
  }

  async getAddress(personId: number) {
    return this.paginationService.paginate(
      this.prismaService.person_addresses,
      {
        fields:
          'id,type_id,person_id,primary,street,number,complement,district,city,state,postal_code,reference,country_id',
      },
      {
        where: {
          person_id: personId,
        },
      },
    );
  }

  async getAddressByTypeId(personId: number, typeId: number) {
    const address = await this.prismaService.person_addresses.findFirst({
      where: {
        person_id: personId,
        type_id: typeId,
      },
    });

    if (!address) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return address;
  }

  async getAddressById(addressId: number) {
    return this.prismaService.person_addresses.findFirst({
      where: {
        id: addressId,
      },
    });
  }

  async update(addressId: number, data: UpdatePersonAddressDTO) {
    return this.prismaService.person_addresses.update({
      where: { id: addressId },
      data,
    });
  }

  async remove(addressId: number) {
    return this.prismaService.person_addresses
      .delete({
        where: {
          id: addressId,
        },
      })
      .then(() => {
        return { count: 1 };
      });
  }
}
