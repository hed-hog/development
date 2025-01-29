import { PaginationService, PaginationDTO } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Injectable()
export class SubscriptionPersonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async create(subscriptionId: number, data: CreateDTO) {
    return this.prismaService.subscription_person.create({
      data: {
        subscription_id: subscriptionId,
        ...data
      }
    });
  }

  async get(subscriptionId: number, id: number) {
    return this.prismaService.subscription_person.findFirst({
      where: {
        subscription_id: subscriptionId,
        id: id
      }
    });
  }

  async list(paginationParams: PaginationDTO, subscriptionId?: number) {
    const where: any = {};
    if (subscriptionId !== undefined) where.subscription_id = subscriptionId;

    return this.paginationService.paginate(
      this.prismaService.subscription_person,
      {
        fields: 'role',
        ...paginationParams
      },
      {
        where
      }
    );
  }

  async update(subscriptionId: number, id: number, data: UpdateDTO) {
    return this.prismaService.subscription_person.updateMany({
      where: {
        subscription_id: subscriptionId,
        id: id
      },
      data
    });
  }

  async delete(subscriptionId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.'
      );
    }

    return this.prismaService.subscription_person.deleteMany({
      where: {
        subscription_id: subscriptionId,
        id: {
          in: ids
        }
      }
    });
  }
}
