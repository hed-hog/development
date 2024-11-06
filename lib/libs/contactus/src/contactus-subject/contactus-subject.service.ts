import { PaginationDTO, PaginationService } from "@hedhog/pagination";
import { PrismaService } from "@hedhog/prisma";
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { CreateDTO } from "./dto/create.dto";
import { DeleteDTO } from "./dto/delete.dto";
import { UpdateDTO } from "./dto/update.dto";

@Injectable()
export class ContactusSubjectService {
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
      contactus_subject: {
        select: {
          id: true,
          contactus_subject_locale: {
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
      this.prismaService.contactus_subject_locale,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      "contactus_subject_locale",
    );
  }

  async get(contactusSubjectId: number) {
    return this.prismaService.contactus_subject.findUnique({
      where: { id: contactusSubjectId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.contactus_subject.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.contactus_subject.update({
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

    return this.prismaService.contactus_subject.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
