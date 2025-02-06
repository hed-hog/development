import { Module } from '@nestjs/common';
import { SubscriptionProfileController } from './subscriptionprofile.controller';
import { SubscriptionProfileService } from './subscriptionprofile.service';

@Module({
  imports: [],
  controllers: [SubscriptionProfileController],
  providers: [SubscriptionProfileService],
})
export class SubscriptionProfileModule {}
