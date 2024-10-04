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
    return this.prismaService.person_customs.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async getCustoms(personId: number) {
    return this.paginationService.paginate(
      this.prismaService.person_customs,
      {
        fields: 'id,person_id,type_id,name,value',
      },
      {
        where: {
          person_id: personId,
        },
        include: {
          person_custom_types: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    );
  }

  async getCustomById(personId: number, customId: number) {
    const custom = await this.prismaService.person_customs.findFirst({
      where: {
        person_id: personId,
        id: customId,
      },
      include: {
        person_custom_types: {
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

  async update(customId: number, data: UpdatePersonCustomDTO) {
    return this.prismaService.person_customs.update({
      where: { id: customId },
      data,
    });
  }

  async remove(customId: number) {
    return this.prismaService.person_customs
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
