import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SubscriptionProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getSubscriptions(userId: number) {
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
}
