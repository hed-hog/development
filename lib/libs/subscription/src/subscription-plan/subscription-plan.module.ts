import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionPlanGatewayController } from './subscription-plan-gateway/subscription-plan-gateway.controller';
import { SubscriptionPlanGatewayService } from './subscription-plan-gateway/subscription-plan-gateway.service';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { SubscriptionPlanService } from './subscription-plan.service';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [SubscriptionPlanGatewayController, SubscriptionPlanController],
  providers: [SubscriptionPlanGatewayService, SubscriptionPlanService],
  exports: [forwardRef(() => SubscriptionPlanService)],
})
export class SubscriptionPlanModule {}
