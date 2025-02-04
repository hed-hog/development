import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SubscriptionListenerService } from './subscriptionlistener.service';

@Module({
  imports: [forwardRef(() => PrismaModule), EventEmitterModule.forRoot()],
  controllers: [],
  providers: [SubscriptionListenerService],
})
export class SubscriptionListenerModule {}
