import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => SubscriptionPlanModule),
    forwardRef(() => SubscriptionModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SubscriptionModule {}
