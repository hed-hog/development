import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  subscription_person_role_enum,
  subscription_status_enum,
} from '@prisma/client';
import { CreateDTO } from './dto/create.dto';

@Injectable()
export class SubscriptionCreateService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
  ) {}

  async addSubscription(data: CreateDTO) {
    if (data.limit < data.person_ids.length) {
      throw new BadRequestException('Limit is less than the number of people');
    }

    const { id } = await this.prismaService.subscription.create({
      data: {
        status: data.status as subscription_status_enum,
        plan_id: data.plan_id,
        limit: data.limit || 1,
      },
    });

    data.person_ids.map(async (personId) => {
      await this.prismaService.subscription_person.create({
        data: {
          subscription_id: id,
          person_id: personId,
          role: data.role as subscription_person_role_enum,
        },
      });
    });

    return { success: true };
  }
}
