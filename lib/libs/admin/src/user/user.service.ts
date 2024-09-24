import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './constants/user.constants';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) {}

  async listRoles(userId: number, paginationParams: PaginationDTO) {
    return this.paginationService.paginate(
      this.prismaService.roles,
      paginationParams,
      {
        include: {
          role_users: {
            where: {
              user_id: userId,
            },
            select: {
              user_id: true,
              role_id: true,
            },
          },
        },
      },
    );
  }

  async updateRoles(userId: number, { ids }: UpdateIdsDTO) {
    await this.prismaService.roles.deleteMany({
      where: {
        user_id: userId,
      },
    });

    return this.prismaService.roles.createMany({
      data: ids.map((role) => {
        return {
          user_id: userId,
          role_id: role,
        };
      }),
      skipDuplicates: true,
    });
  }

  async getUsers(paginationParams: PaginationDTO) {
    const fields = ['name', 'email'];
    const OR = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.users,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(userId: number) {
    return this.prismaService.users.findUnique({ where: { id: userId } });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(password, salt);
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
