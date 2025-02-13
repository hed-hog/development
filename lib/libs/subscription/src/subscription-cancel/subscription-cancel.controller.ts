import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { AddSubscriptionCancelDTO } from './dto/add-subscription-cancel.dto';
import { SubscriptionCancelService } from './subscription-cancel.service';

@Controller('subscription-cancel')
export class SubscriptionCancelController {
  constructor(
    @Inject(forwardRef(() => SubscriptionCancelService))
    private readonly subscriptionCancelService: SubscriptionCancelService,
  ) {}

  @Get('reasons')
  async listReasons(@Locale() locale: string, @Pagination() paginationParams) {
    return this.subscriptionCancelService.listReasons(locale, paginationParams);
  }

  @Post()
  async addSubscriptionCancel(
    @Body() addSubscriptionCancelDto: AddSubscriptionCancelDTO,
  ) {
    const { subscriptionId, reasonIds, personId, comment } =
      addSubscriptionCancelDto;
    return this.subscriptionCancelService.addSubscriptionCancel(
      subscriptionId,
      reasonIds,
      personId,
      comment,
    );
  }
}
