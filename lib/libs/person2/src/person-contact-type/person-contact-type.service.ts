import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from './dto/delete.dto';

@Injectable()
export class PersonContactTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateDTO) {
    return await this.prismaService.person_contact_type.create({
      data,
    });
  }

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = [];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_contact_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_contact_type_locale: {
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
      'person_contact_type_locale',
    );
  }

  async get(id: number) {
    const ContactType = await this.prismaService.person_contact_type.findUnique(
      {
        where: { id },
      },
    );

    if (!ContactType) {
      throw new NotFoundException(`ContactType with ID ${id} not found`);
    }

    return ContactType;
  }

  async update(id: number, data: UpdateDTO) {
    return await this.prismaService.person_contact_type.update({
      where: { id },
      data: data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one ContactType to delete.`,
      );
    }

    return await this.prismaService.person_contact_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
