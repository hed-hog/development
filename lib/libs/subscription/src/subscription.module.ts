import { AdminModule } from '@hedhog/admin';
import { ContactModule } from '@hedhog/contact';
import { MailModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionCancelModule } from './subscription-cancel/subscription-cancel.module';
import { SubscriptionCreateModule } from './subscription-create/subscription-create.module';
import { SubscriptionListenerModule } from './subscription-listener/subscriptionlistener.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { SubscriptionProfileModule } from './subscription-profile/subscriptionprofile.module';
import { SubscriptionModule as SubscriptionModule2 } from './subscription/subscription.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => SubscriptionPlanModule),
    forwardRef(() => SubscriptionCancelModule),
    forwardRef(() => SubscriptionCreateModule),
    forwardRef(() => SubscriptionModule2),
    forwardRef(() => SubscriptionListenerModule),
    forwardRef(() => SubscriptionProfileModule),
    forwardRef(() => ContactModule),
    forwardRef(() => MailModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SubscriptionModule {}
