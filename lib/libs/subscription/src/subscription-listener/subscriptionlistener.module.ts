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
    EventEmitterModule.forRoot({
      wildcard: true,
      global: true,
    }),
  ],
  controllers: [SubscriptionListenerController],
  providers: [SubscriptionListenerService],
})
export class SubscriptionListenerModule {}
