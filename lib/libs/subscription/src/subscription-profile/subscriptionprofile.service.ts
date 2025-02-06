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
              lte: new Date(),
            },
            end_at: {
              gte: new Date(),
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

    return {
      data: this.jwtService.sign({ subscriptions, userId }),
    };
  }

  async getSubscriptions(userId: number) {
    return this.prismaService.subscription.findMany({
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
              lte: new Date(),
            },
            end_at: {
              gte: new Date(),
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
  }
}
