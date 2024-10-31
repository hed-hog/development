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
    return this.prismaService.person_address.create({
      data: {
        person_id: personId,
        country_id: data.country_id,
        ...data,
      },
    });
  }

  async list(personId?: number, typeId?: number, addressId?: number) {
    if (addressId) {
      return this.prismaService.person_address.findFirst({
        where: { id: addressId },
      });
    }

    if (typeId) {
      const address = await this.prismaService.person_address.findFirst({
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

    return this.paginationService.paginate(
      this.prismaService.person_address,
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

  async update(addressId: number, data: UpdatePersonAddressDTO) {
    return this.prismaService.person_address.update({
      where: { id: addressId },
      data,
    });
  }

  async delete(addressId: number) {
    return this.prismaService.person_address
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
