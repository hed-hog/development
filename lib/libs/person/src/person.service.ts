import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@hedhog/prisma';
import { CreatePersonDTO } from './dto/create-person.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { UpdateIdsDTO } from './dto/update-ids.dto';
import { DeleteDTO } from './dto/delete.dto';

@Injectable()
export class PersonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreatePersonDTO) {
    return await this.prismaService.persons.create({
      data,
    });
  }

  async getPersons(paginationParams: PaginationDTO) {
    const fields = ['name', 'person_type'];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.persons,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_addresses: true,
          person_contacts: true,
          person_documents: true,
          person_custom_attributes: true,
        },
      },
    );
  }

  async getPersonById(id: number) {
    const person = await this.prismaService.persons.findUnique({
      where: { id },
      include: {
        person_documents: true,
        person_contacts: true,
        person_addresses: true,
      },
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return person;
  }

  async update(id: number, data: UpdatePersonDTO) {
    return await this.prismaService.persons.update({
      where: { id },
      data: data,
    });
  }

  async remove({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one person to delete.`,
      );
    }

    return await this.prismaService.persons.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async listDocuments(personId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.person_documents,
      paginationParams,
      {
        where: { person_id: personId },
      },
    );
  }

  async listContacts(personId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.person_contacts,
      paginationParams,
      {
        where: { person_id: personId },
      },
    );
  }

  async listAddresses(personId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.person_addresses,
      paginationParams,
      {
        where: { person_id: personId },
      },
    );
  }
}
