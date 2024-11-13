import { PaymentSubModule } from './payment/payment.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PlanDurationModule } from './plan-duration/plan-duration.module';
import { PlanModule } from './plan/plan.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PlanModule),
    forwardRef(() => PlanDurationModule),
    forwardRef(() => SubscriptionModule),
    forwardRef(() => PaymentGatewayModule),
    forwardRef(() => PaymentSubModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
