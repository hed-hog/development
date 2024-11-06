import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class PersonDocumentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(personId: number, data: CreateDTO) {
    return this.prismaService.person_document.create({
      data: {
        person_id: personId,
        ...data,
      },
    });
  }

  async list(personId?: number, typeId?: number, documentId?: number) {
    const where: any = {};
    if (personId) where.person_id = personId;
    if (typeId) where.type_id = typeId;
    if (documentId) where.id = documentId;

    const documents = await this.paginationService.paginate(
      this.prismaService.person_document,
      {
        fields:
          'id,person_id,type_id,primary,value,country_id,issued_at,expiry_at',
      },
      {
        where,
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

    if (documentId && !documents) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    return documents;
  }

  async update(documentId: number, data: UpdateDTO) {
    return this.prismaService.person_document.update({
      where: { id: documentId },
      data,
    });
  }

  async delete(documentId: number) {
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
