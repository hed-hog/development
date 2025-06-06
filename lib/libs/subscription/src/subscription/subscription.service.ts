import { DeleteDTO } from '@hedhog/core';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { subscription_status_enum } from '@prisma/client';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
  ) { }

  async list(paginationParams: PaginationDTO, isActive: boolean) {
    const fields = [];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    let subscriptionIdsByPerson: number[] = [];

    if (paginationParams.search) {
      const matchingSubscriptionPersons =
        await this.prismaService.subscription_person.findMany({
          where: {
            person: {
              name: {
                contains: paginationParams.search,
                mode: 'insensitive',
              },
            },
          },
          select: {
            subscription_id: true,
          },
        });

      subscriptionIdsByPerson = matchingSubscriptionPersons.map(
        (sp) => sp.subscription_id,
      );

      if (subscriptionIdsByPerson.length > 0) {
        OR.push({
          id: { in: subscriptionIdsByPerson },
        });
      }
    }

    const subscriptions = await this.paginationService.paginate(
      this.prismaService.subscription,
      paginationParams,
      {
        where: {
          OR,
          ...(isActive ? { status: 'active' } : {}),
        },
        include: {
          subscription_plan: {
            include: {
              item: true,
            },
          },
        },
      },
    );

    const subscriptionPayments =
      await this.prismaService.subscription_payment.findMany({
        where: {
          subscription_id: { in: subscriptions.data.map((s) => s.id) },
        },
        include: {
          payment: {
            include: {
              payment_method: true,
            },
          },
        },
      });

    const subscriptionPersons =
      await this.prismaService.subscription_person.findMany({
        where: {
          subscription_id: { in: subscriptions.data.map((s) => s.id) },
        },
        include: {
          person: {
            select: {
              person_user: {
                select: {
                  user_id: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        }
      });

    const personIds = subscriptionPersons.map((sp) => sp.person_id);
    const persons = await this.prismaService.person.findMany({
      where: {
        id: { in: personIds },
      },
      select: { id: true, name: true },
    });

    const paymentMap = new Map<number, any>();
    subscriptionPayments.forEach((subscriptionPayment) => {
      const payment = subscriptionPayment.payment;
      if (payment) {
        paymentMap.set(subscriptionPayment.subscription_id, {
          ...subscriptionPayment,
          amount: payment.amount,
          method_name: payment.payment_method?.name || 'Desconhecido',
        });
      }
    });

    const personMap = new Map<number, any>();
    persons.forEach((person) => {
      personMap.set(person.id, person.name);
    });

    const subscriptionPersonMap = new Map<number, any[]>();
    subscriptionPersons.forEach((sp) => {
      if (!subscriptionPersonMap.has(sp.subscription_id)) {
        subscriptionPersonMap.set(sp.subscription_id, []);
      }
      subscriptionPersonMap.get(sp.subscription_id)?.push({
        ...sp,
        person_name: personMap.get(sp.person_id) || 'Desconhecido',
      });
    });

    subscriptions.data = subscriptions.data.map((subscription) => ({
      ...subscription,
      subscription_payment: paymentMap.get(subscription.id) || {
        amount: 0,
        method_name: 'Desconhecido',
      },
      subscription_person: subscriptionPersonMap.get(subscription.id) || [],
    }));

    return subscriptions;
  }

  async get(id: number) {
    return this.prismaService.subscription.findUnique({
      where: { id: id },
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.subscription.create({
      data: {
        status: data.status as subscription_status_enum,
        plan_id: data.plan_id,
        limit: data.limit || 1,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.subscription.update({
      where: { id: id },
      data: {
        status: data.status as subscription_status_enum,
        plan_id: data.plan_id,
        limit: data.limit || 1,
      },
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.subscription.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
