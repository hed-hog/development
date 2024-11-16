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
export class ComponentService {
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
      component_locale: {
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
      this.prismaService.component,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      "component_locale",
    );
  }

  async get(componentId: number) {
    return this.prismaService.component.findUnique({
      where: { id: componentId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.component.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.component.update({
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

    return this.prismaService.component.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
