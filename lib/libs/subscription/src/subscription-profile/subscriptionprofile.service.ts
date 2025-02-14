import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SubscriptionProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getSubscriptionsTokens(userId: number) {
    const now = new Date();

    console.log('getSubscriptions', {
      userId,
      dateNow: now.toISOString(),
    });

    const subscriptions = await this.prismaService.subscription.findMany({
      where: {
        status: 'active',
        subscription_person: {
          some: {
            person: {
              person_user: {
                some: {
                  user_id: userId,
                },
              },
            },
          },
        },
        subscription_payment: {
          some: {
            start_at: {
              lte: now,
            },
            end_at: {
              gte: now,
            },
          },
        },
      },
      select: {
        id: true,
        subscription_plan: {
          select: {
            item_id: true,
            slug: true,
          },
        },
      },
    });

    console.log('subscriptions', subscriptions);

    return {
      data: this.jwtService.sign({ subscriptions, userId }),
    };
  }

  async getSubscriptions(userId: number) {
    const now = new Date();

    console.log('getSubscriptions', {
      userId,
      dateNow: now.toISOString(),
    });
    const subscriptions = await this.prismaService.subscription.findMany({
      where: {
        subscription_person: {
          some: {
            person: {
              person_user: {
                some: {
                  user_id: userId,
                },
              },
            },
          },
        },
        subscription_payment: {
          some: {
            start_at: {
              lte: now,
            },
            end_at: {
              gte: now,
            },
          },
        },
      },
      include: {
        subscription_plan: {
          include: {
            item: true,
          },
        },
        subscription_payment: {
          include: {
            payment: {
              include: {
                payment_method: {
                  select: {
                    name: true,
                  },
                },
                payment_value: {
                  select: {
                    name: true,
                    value: true,
                  },
                },
                payment_card_brand: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log('subscriptions', subscriptions);

    return subscriptions;
  }
}
