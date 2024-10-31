import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonTypeDTO } from './dto/create-person-type.dto';
import { UpdatePersonTypeDTO } from './dto/update-person-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Injectable()
export class PersonTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreatePersonTypeDTO) {
    return await this.prismaService.person_type.create({
      data,
    });
  }

  async getPersonTypes(locale: string, paginationParams: PaginationDTO) {
    const fields = [];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_type_locale: {
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
      'person_type_locale',
    );
  }

  async getPersonTypeById(id: number) {
    const PersonType = await this.prismaService.person_type.findUnique({
      where: { id },
    });

    if (!PersonType) {
      throw new NotFoundException(`PersonType with ID ${id} not found`);
    }

    return PersonType;
  }

  async update(id: number, data: UpdatePersonTypeDTO) {
    return await this.prismaService.person_type.update({
      where: { id },
      data: data,
    });
  }

  async remove({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one PersonType to delete.`,
      );
    }

    return await this.prismaService.person_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
