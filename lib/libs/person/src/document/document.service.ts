import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDocumentDTO } from './dto/create-document.dto';
import { UpdatePersonDocumentDTO } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreatePersonDocumentDTO) {
    return this.prismaService.person_document.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async getDocuments(personId: number) {
    return this.paginationService.paginate(
      this.prismaService.person_document,
      {
        fields:
          'id,person_id,type_id,primary,value,country_id,issued_at,expiry_at',
      },
      {
        where: {
          person_id: personId,
        },
        include: {
          person_document_type: {
            select: {
              id: true,
              name: true,
            },
          },
          country: {
            select: {
              name: true,
            },
          },
        },
      },
    );
  }

  async getDocumentByTypeId(personId: number, typeId: number) {
    const document = await this.prismaService.person_document.findFirst({
      where: {
        person_id: personId,
        type_id: typeId,
      },
      include: {
        person_document_type: {
          select: {
            id: true,
            name: true,
          },
        },
        country: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return document;
  }

  async getDocumentById(documentId: number) {
    return this.prismaService.person_document.findFirst({
      where: {
        id: documentId,
      },
      include: {
        person_document_type: {
          select: {
            id: true,
            name: true,
          },
        },
        country: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(documentId: number, data: UpdatePersonDocumentDTO) {
    return this.prismaService.person_document.update({
      where: { id: documentId },
      data,
    });
  }

  async remove(documentId: number) {
    return this.prismaService.person_document
      .delete({
        where: {
          id: documentId,
        },
      })
      .then(() => {
        return { count: 1 };
      });
  }
}
