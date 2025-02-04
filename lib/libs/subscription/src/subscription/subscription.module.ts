import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionPaymentController } from './subscription-payment/subscription-payment.controller';
import { SubscriptionPaymentService } from './subscription-payment/subscription-payment.service';
import { SubscriptionPersonController } from './subscription-person/subscription-person.controller';
import { SubscriptionPersonService } from './subscription-person/subscription-person.service';
import { SubscriptionValueController } from './subscription-value/subscription-value.controller';
import { SubscriptionValueService } from './subscription-value/subscription-value.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [
    SubscriptionController,
    SubscriptionValueController,
    SubscriptionPersonController,
    SubscriptionPaymentController,
  ],
  providers: [
    SubscriptionService,
    SubscriptionValueService,
    SubscriptionPersonService,
    SubscriptionPaymentService,
  ],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
