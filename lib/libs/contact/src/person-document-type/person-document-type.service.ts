import { PaginationDTO, PaginationService } from "@hedhog/pagination";
import { PrismaService } from "@hedhog/prisma";
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { CreateDTO } from "./dto/create.dto";
import { DeleteDTO } from "@hedhog/utils";
import { UpdateDTO } from "./dto/update.dto";

@Injectable()
export class PersonDocumentTypeService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = ["slug"];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const include = {
      person_document_type: {
        select: {
          id: true,
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
    };

    return this.paginationService.paginate(
      this.prismaService.person_document_type_locale,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      "person_document_type_locale",
    );
  }

  async get(personDocumentTypeId: number) {
    return this.prismaService.person_document_type.findUnique({
      where: { id: personDocumentTypeId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.person_document_type.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.person_document_type.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        "You must select at least one item to delete.",
      );
    }

    return this.prismaService.person_document_type.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}