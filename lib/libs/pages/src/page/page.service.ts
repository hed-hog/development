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
export class PageService {
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
      page_locale: {
        where: {
          locale: {
            code: locale,
          },
        },
        select: {
          name: true,
        },
      },
    };

    return this.paginationService.paginate(
      this.prismaService.page,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      "page_locale",
    );
  }

  async get(pageId: number) {
    return this.prismaService.page.findUnique({
      where: { id: pageId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.page.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.page.update({
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

    return this.prismaService.page.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
