import { ContactModule } from '@hedhog/contact';
import { CheckoutModule, PaymentModule } from '@hedhog/payment';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SubscriptionListenerController } from './subscriptionlistener.controller';
import { SubscriptionListenerService } from './subscriptionlistener.service';

@Module({
  imports: [
    forwardRef(() => CheckoutModule),
    forwardRef(() => PaymentModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => ContactModule),
    EventEmitterModule.forRoot({
      wildcard: true,
      global: true,
    }),
  ],
  controllers: [SubscriptionListenerController],
  providers: [SubscriptionListenerService],
})
export class SubscriptionListenerModule {}
