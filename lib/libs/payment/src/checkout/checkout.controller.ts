import { Public, User } from '@hedhog/core';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';

@Public()
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get()
  async init(@Query('slug') slug: string, @User() user) {
    let personId = user ? user.id : null;

    return this.checkoutService.init(slug);
  }

  @Post()
  async create(@Body() { amount, currency }: CreateDTO) {
    return this.checkoutService.createPaymentIntent(amount, currency);
  }

  @Post('subscription')
  async createSubscription(@Body() { priceId, customerId }: any) {
    return this.checkoutService.createSubscription(priceId, customerId);
  }
}
