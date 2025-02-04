import { Public, User } from '@hedhog/core';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreditCardDTO } from './dto/credit-card.dto';
import { InitDTO } from './dto/init.dto';
import { PixDTO } from './dto/pix.dto';
import { ResetDTO } from './dto/reset.dto';
import { SetCouponDTO } from './dto/set-coupon.dto';

@Public()
@Controller('checkout')
export class CheckoutController {
  constructor(
    @Inject(forwardRef(() => CheckoutService))
    private readonly checkoutService: CheckoutService,
  ) {}

  @Post('notification/:gatewayId')
  async notification(
    @Body() data: any,
    @Param('gatewayId', ParseIntPipe) gatewayId: number,
  ) {
    console.log('notification', { data, gatewayId });

    return {};

    //return this.paymentNotificationService.create()
  }

  @Get('payment-settings')
  async paymentSettings() {
    return this.checkoutService.getPaymentSettings();
  }

  @Post('payment-reset')
  async reset(
    @Body()
    data: ResetDTO,
  ) {
    return this.checkoutService.paymentReset(data);
  }

  @Post('credit-card')
  async payment(
    @Body()
    data: CreditCardDTO,
  ) {
    return this.checkoutService.createPaymentCreditCard(data);
  }

  @Post('pix')
  async pix(
    @Body()
    data: PixDTO,
  ) {
    return this.checkoutService.createPaymentPix(data);
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
