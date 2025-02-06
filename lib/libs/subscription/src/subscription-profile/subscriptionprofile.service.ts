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
    const subscription = await this.prismaService.subscription.findMany({
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
              lte: new Date(),
            },
            end_at: {
              gte: new Date(),
            },
          },
        },
        status: 'active',
      },
      select: {
        id: true,
        status: true,
        subscription_person: {
          select: {
            person_id: true,
          },
        },
        subscription_plan: {
          select: {
            id: true,
            item_id: true,
            slug: true,
          },
        },
      },
    });
    return this.jwtService.sign(subscription);
  }
}
