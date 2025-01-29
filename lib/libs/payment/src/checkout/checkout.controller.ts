import { Public, User } from '@hedhog/core';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';
import { InitDTO } from './dto/init.dto';
import { SetCouponDTO } from './dto/set-coupon.dto';

@Public()
@Controller('checkout')
export class CheckoutController {
  constructor(
    @Inject(forwardRef(() => CheckoutService))
    private readonly checkoutService: CheckoutService,
  ) {}

  @Get('payment-settings')
  async paymentSettings() {
    return this.checkoutService.getPaymentSettings();
  }

  @Post('payment')
  async payment(
    @Body()
    data: CreateDTO,
  ) {
    return this.checkoutService.createPaymentIntent(data);
  }

  @Post('init')
  async init(@Body() { items, slug, couponId }: InitDTO, @User() user) {
    return {
      payment: await this.checkoutService.init({
        items,
        couponId,
        slug,
        userId: user ? user.id : null,
      }),
      settings: await this.checkoutService.getPaymentSettings(),
    };
  }

  @Post('coupon')
  async coupon(@Body() { code, slug }: SetCouponDTO) {
    return this.checkoutService.setCoupon(code, slug);
  }

  @Post('subscription')
  async subscription(@Body() { priceId, customerId }: any) {
    return this.checkoutService.createSubscription(priceId, customerId);
  }
}
