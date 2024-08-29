import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from './dto/delete.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    return this.prismaService.users.findMany();
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
    // .then((user) => user)
    // .catch(() => {
    //   return { msg: 'erro' };
    // });
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
          startsWith: 'root@',
        },
      },
    });
  }
}
