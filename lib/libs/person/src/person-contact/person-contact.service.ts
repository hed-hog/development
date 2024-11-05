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
export class PersonContactService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = ["primary", "value"];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (!isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.person_contact,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(personContactId: number) {
    return this.prismaService.person_contact.findUnique({
      where: { id: personContactId },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.person_contact.create({
      data,
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.person_contact.update({
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

    return this.prismaService.person_contact.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
