import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { users, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async list({
    page,
    pageSize,
    search,
    orderDirection,
    orderField,
    fields,
  }: PaginationDTO) {
    return this.paginationService.getFn({
      page,
      pageSize,
      fields,
      orderDirection,
      orderField,
    })<Prisma.usersFindManyArgs, users>(this.prismaService.users, {
      where: {
        name: {
          contains: search,
        },
      },
    });
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
    console.log(ids);

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
