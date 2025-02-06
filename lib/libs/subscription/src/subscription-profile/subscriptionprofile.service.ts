import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSubscriptions(userId: number) {
    return this.prismaService.subscription.findMany({
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
      include: {
        subscription_plan: true,
      },
    });
  }
}
