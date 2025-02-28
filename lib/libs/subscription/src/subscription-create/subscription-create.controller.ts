import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { SubscriptionCreateService } from './subscription-create.service';

@Controller('subscription-create')
export class SubscriptionCreateController {
  constructor(
    @Inject(forwardRef(() => SubscriptionCreateService))
    private readonly subscriptionCreateService: SubscriptionCreateService,
  ) {}

  @Post()
  async addSubscription(@Body() data: CreateDTO) {
    return this.subscriptionCreateService.addSubscription(data);
  }
}
