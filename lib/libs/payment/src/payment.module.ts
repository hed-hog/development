import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { Payment_gatewaysModule } from './Payment_gateways/Payment_gateways.module';
import { Plan_durationsModule } from './Plan_durations/Plan_durations.module';
import { PlansModule } from './Plans/Plans.module';
import { Subscription_statusesModule } from './Subscription_statuses/Subscription_statuses.module';
import { SubscriptionsModule } from './Subscriptions/Subscriptions.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    ,
    Plan_durationsModule,
    PlansModule,
    Subscription_statusesModule,
    SubscriptionsModule,
    Payment_gatewaysModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
