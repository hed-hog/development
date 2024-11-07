import { PaginationService } from "@hedhog/pagination";
import { PrismaService } from "@hedhog/prisma";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDTO } from "./dto/create.dto";
import { UpdateDTO } from "./dto/update.dto";

@Injectable()
export class PersonAddressService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.person_address.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async list(personId?: number, typeId?: number, addressId?: number) {
    const where: any = {};
    if (personId !== undefined) where.person_id = personId;
    if (typeId !== undefined) where.type_id = typeId;
    if (addressId !== undefined) where.id = addressId;

    const addresss = await this.prismaService.person_address.findMany({
      where,
      include: {
        person_address_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (Boolean(addressId) && addresss.length === 0) {
      throw new NotFoundException(`address with ID ${addressId} not found`);
    }

    if (Boolean(typeId) && addresss.length === 0) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return this.paginationService.paginate(
      this.prismaService.person_address,
      {
        fields: "id,person_id,type_id,primary,value",
      },
      {
        where,
        include: {
          person_address_type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    );
  }

  async update(addressId: number, data: UpdateDTO) {
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
