import { Public } from '@hedhog/core';
import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';

@Public()
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async create(@Body() { amount, currency }: CreateDTO) {
    return this.checkoutService.createPaymentIntent(amount, currency);
  }

  @Post('subscription')
  async createSubscription(@Body() { priceId, customerId }: any) {
    return this.checkoutService.createSubscription(priceId, customerId);
  }
}
