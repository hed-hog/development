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
    return await this.prismaService.person_contact_types.create({
      data,
    });
  }

  async getContactTypes(paginationParams: PaginationDTO) {
    const fields = ['name'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.person_contact_types,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async getContactTypeById(id: number) {
    const ContactType =
      await this.prismaService.person_contact_types.findUnique({
        where: { id },
      });

    if (!ContactType) {
      throw new NotFoundException(`ContactType with ID ${id} not found`);
    }

    return ContactType;
  }

  async update(id: number, data: UpdateContactTypeDTO) {
    return await this.prismaService.person_contact_types.update({
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

    return await this.prismaService.person_contact_types.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
