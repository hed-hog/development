import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDocumentTypeDTO } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDTO } from './dto/update-document-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Injectable()
export class DocumentTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateDocumentTypeDTO) {
    return await this.prismaService.person_document_type.create({
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
      this.prismaService.person_document_type,
      paginationParams,
      {
        where: {
          OR,
        },
        include: {
          person_document_type_locale: {
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
      'person_document_type_locale',
    );
  }

  async get(id: number) {
    const DocumentType =
      await this.prismaService.person_document_type.findUnique({
        where: { id },
      });

    if (!DocumentType) {
      throw new NotFoundException(`DocumentType with ID ${id} not found`);
    }

    return DocumentType;
  }

  async update(id: number, data: UpdateDocumentTypeDTO) {
    return await this.prismaService.person_document_type.update({
      where: { id },
      data: data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one DocumentType to delete.`,
      );
    }

    return await this.prismaService.person_document_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
