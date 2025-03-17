import { PaginationService, PaginationDTO } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Injectable()
export class SubscriptionPlanGatewayService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(planId: number, data: CreateDTO) {
    return this.prismaService.subscription_plan_gateway.create({
      data: {
        plan_id: planId,
        ...data,
      },
    });
  }

  async get(planId: number, id: number) {
    return this.prismaService.subscription_plan_gateway.findFirst({
      where: {
        plan_id: planId,
        id: id,
      },
    });
  }

  async list(paginationParams: PaginationDTO, planId?: number) {
    const where: any = {};
    if (planId !== undefined) where.plan_id = planId;

    return this.paginationService.paginate(
      this.prismaService.subscription_plan_gateway,
      paginationParams,
      {
        where,
      },
    );
  }

  async update(planId: number, id: number, data: UpdateDTO) {
    return this.prismaService.subscription_plan_gateway.updateMany({
      where: {
        plan_id: planId,
        id: id,
      },
      data,
    });
  }

  async delete(planId: number, { ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.subscription_plan_gateway.deleteMany({
      where: {
        plan_id: planId,
        id: {
          in: ids,
        },
      },
    });
  }
}
