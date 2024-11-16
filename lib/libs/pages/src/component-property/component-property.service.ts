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
export class ComponentPropertyService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(locale: string, paginationParams: PaginationDTO) {
    const fields = ["default"];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    const include = {
      component_property_locale: {
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
      this.prismaService.component_property,
      paginationParams,
      {
        where: {
          OR,
        },
        include,
      },
      "component_property_locale",
    );
  }

  async get(componentPropertyId: number) {
    return this.prismaService.component_property.findUnique({
      where: { id: componentPropertyId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.component_property.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.component_property.update({
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

    return this.prismaService.component_property.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
