import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonCustomDTO } from './dto/create-custom.dto';
import { UpdatePersonCustomDTO } from './dto/update-custom.dto';

@Injectable()
export class CustomService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreatePersonCustomDTO) {
    return this.prismaService.person_custom.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async getCustoms(personId: number) {
    return this.paginationService.paginate(
      this.prismaService.person_custom,
      {
        fields: 'id,person_id,type_id,name,value',
      },
      {
        where: {
          person_id: personId,
        },
        include: {
          person_custom_type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    );
  }

  async getCustomByTypeId(personId: number, customId: number) {
    const custom = await this.prismaService.person_custom.findFirst({
      where: {
        person_id: personId,
        id: customId,
      },
      include: {
        person_custom_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!custom) {
      throw new NotFoundException(`ID not found`);
    }

    return custom;
  }

  async getCustomById(customId: number) {
    return this.prismaService.person_custom.findFirst({
      where: {
        id: customId,
      },
      include: {
        person_custom_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(customId: number, data: UpdatePersonCustomDTO) {
    return this.prismaService.person_custom.update({
      where: { id: customId },
      data,
    });
  }

  async remove(customId: number) {
    return this.prismaService.person_custom
      .delete({
        where: {
          id: customId,
        },
      })
      .then(() => {
        return { count: 1 };
      });
  }
}
