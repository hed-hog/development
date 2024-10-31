import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactTypeDTO } from './dto/create-contact-type.dto';
import { UpdateContactTypeDTO } from './dto/update-contact-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Injectable()
export class ContactTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateContactTypeDTO) {
    return await this.prismaService.person_contact_type.create({
      data,
    });
  }

  async getContactTypes(locale: string, paginationParams: PaginationDTO) {
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

  async getContactTypeById(id: number) {
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

  async update(id: number, data: UpdateContactTypeDTO) {
    return await this.prismaService.person_contact_type.update({
      where: { id },
      data: data,
    });
  }

  async remove({ ids }: DeleteDTO) {
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
