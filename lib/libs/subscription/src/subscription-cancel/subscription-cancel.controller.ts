import { Role } from '@hedhog/core';
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
import { SubscriptionCancelService } from './subscription-cancel.service';

@Role()
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
    @Body('subscriptionId') subscriptionId: number,
    @Body('personId') personId: number,
    @Body('comment') comment: string,
  ) {
    return this.subscriptionCancelService.addSubscriptionCancel(
      subscriptionId,
      personId,
      comment,
    );
  }
}
