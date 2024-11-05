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

  async list(personId: number, customId?: number, typeId?: number) {
    const whereClause: any = { person_id: personId };
    if (customId) {
      whereClause.id = customId;
    }
    if (typeId) {
      whereClause.type_id = typeId;
    }

    const customs = await this.prismaService.person_customs.findMany({
      where: whereClause,
      include: {
        person_custom_types: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (customId && customs.length === 0) {
      throw new NotFoundException(`ID not found`);
    }

    return this.paginationService.paginate(
      this.prismaService.person_customs,
      {
        fields: 'id,person_id,type_id,name,value',
      },
      {
        where: whereClause,
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

  async update(customId: number, data: UpdatePersonCustomDTO) {
    return this.prismaService.person_customs.update({
      where: { id: customId },
      data,
    });
  }

  async delete(customId: number) {
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
