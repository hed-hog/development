import { User } from '@hedhog/core';
import { Controller, Get } from '@nestjs/common';
import { SubscriptionProfileService } from './subscriptionprofile.service';

@Controller('subscription-profile')
export class SubscriptionProfileController {
  constructor(
    private readonly subscriptionProfileService: SubscriptionProfileService,
  ) {}

  @Get('subscriptions')
  async getSubscriptions(@User() { id }) {
    return this.subscriptionProfileService.getSubscriptions(id);
  }
}
