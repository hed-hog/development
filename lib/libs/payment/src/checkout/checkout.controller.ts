import { Public, User } from '@hedhog/core';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';

@Public()
@Controller('checkout')
export class CheckoutController {
  constructor(
    @Inject(forwardRef(() => CheckoutService))
    private readonly checkoutService: CheckoutService,
  ) {}

  @Get()
  async init(@Query('slug') slug: string, @User() user) {
    return {
      user,
      slug,
    };
    let personId = user ? user.id : null;

    return this.checkoutService.init(slug);
  }

  @Post()
  async payment(
    @Body()
    data: CreateDTO,
  ) {
    return this.checkoutService.createPaymentIntent(data);
  }

  @Post('subscription')
  async subscription(@Body() { priceId, customerId }: any) {
    return this.checkoutService.createSubscription(priceId, customerId);
  }
}
