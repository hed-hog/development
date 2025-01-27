import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { SubscriptionModule as SubscriptionModule2 } from './subscription/subscription.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => SubscriptionPlanModule),
    forwardRef(() => SubscriptionModule2),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SubscriptionModule {}
