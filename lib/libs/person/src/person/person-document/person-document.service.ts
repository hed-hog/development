import { PaginationService } from "@hedhog/pagination";
import { PrismaService } from "@hedhog/prisma";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDTO } from "./dto/create.dto";
import { UpdateDTO } from "./dto/update.dto";

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
    if (personId !== undefined) where.person_id = personId;
    if (typeId !== undefined) where.type_id = typeId;
    if (documentId !== undefined) where.id = documentId;

    const documents = await this.prismaService.person_document.findMany({
      where,
      include: {
        person_document_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (Boolean(documentId) && documents.length === 0) {
      throw new NotFoundException(`document with ID ${documentId} not found`);
    }

    if (Boolean(typeId) && documents.length === 0) {
      throw new NotFoundException(`Type with ID ${typeId} not found`);
    }

    return this.paginationService.paginate(
      this.prismaService.person_document,
      {
        fields: "id,person_id,type_id,primary,value",
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
        },
      },
    );
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
