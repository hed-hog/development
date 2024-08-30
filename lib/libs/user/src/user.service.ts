import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async getUsers(paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.users,
      paginationParams,
    );
  }

  async get(userId: number) {
    return this.prismaService.users.findUnique({ where: { id: userId } });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  async create({ email, name, password }: CreateDTO) {
    const hashedPassword = await this.hashPassword(password);

    return this.prismaService.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
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
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        `You must select at least one user to delete.`,
      );
    }

    return this.prismaService.users.deleteMany({
      where: {
        id: {
          in: ids,
        },
        email: {
          not: {
            startsWith: 'root@',
          },
        },
      },
    });
  }
}
