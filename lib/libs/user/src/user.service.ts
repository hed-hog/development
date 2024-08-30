import { PaginationParams, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async getUsers(paginationParams: PaginationParams) {
    return this.paginationService.paginate(
      this.prismaService.users,
      paginationParams,
    );
  }

  async get(userId: number) {
    return this.prismaService.users.findUnique({ where: { id: userId } });
  }

  async create({ email, name, password }: CreateDTO) {
    return this.prismaService.users.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.users.update({
      where: { id },
      data,
    });
  }

  async delete({ ids }: DeleteDTO) {
    return this.prismaService.users.deleteMany({
      where: {
        id: {
          in: ids,
          not: {
            equals: 1,
          },
        },
        name: {
          not: {
            equals: 'root',
          },
        },
      },
    });
  }
}
