import { PaymentSubscriptionModule } from './PaymentSubscription/PaymentSubscription.module';

import { PaymentModule } from './Payment/Payment.module';

import { PaymentStatusModule } from './PaymentStatus/PaymentStatus.module';

import { PaymentGatewayModule } from './PaymentGateway/PaymentGateway.module';

import { SubscriptionModule } from './Subscription/Subscription.module';

import { SubscriptionStatusModule } from './SubscriptionStatus/SubscriptionStatus.module';

import { PlanModule } from './Plan/Plan.module';

import { PlanDurationModule } from './PlanDuration/PlanDuration.module';

import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ,
    PlanDurationModule,
    PlanModule,
    SubscriptionStatusModule,
    SubscriptionModule,
    PaymentGatewayModule,
    PaymentStatusModule,
    PaymentModule,
    PaymentSubscriptionModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
