import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { SubscriptionPlanGatewayController } from "./subscription-plan-gateway/subscription-plan-gateway.controller";
import { SubscriptionPlanGatewayService } from "./subscription-plan-gateway/subscription-plan-gateway.service";
import { SubscriptionValueController } from "./subscription-value/subscription-value.controller";
import { SubscriptionValueService } from "./subscription-value/subscription-value.service";
import { SubscriptionPersonController } from "./subscription-person/subscription-person.controller";
import { SubscriptionPersonService } from "./subscription-person/subscription-person.service";
import { SubscriptionPaymentController } from "./subscription-payment/subscription-payment.controller";
import { SubscriptionPaymentService } from "./subscription-payment/subscription-payment.service";
import { SubscriptionPlanController } from "./subscription-plan.controller";
import { SubscriptionPlanService } from "./subscription-plan.service";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [
    SubscriptionPlanGatewayController,
    SubscriptionValueController,
    SubscriptionPersonController,
    SubscriptionPaymentController,
    SubscriptionPlanController,
  ],
  providers: [
    SubscriptionPlanGatewayService,
    SubscriptionValueService,
    SubscriptionPersonService,
    SubscriptionPaymentService,
    SubscriptionPlanService,
  ],
  exports: [forwardRef(() => SubscriptionPlanService)],
})
export class SubscriptionPlanModule {}
