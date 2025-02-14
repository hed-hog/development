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
  Put,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreditCardDTO } from './dto/credit-card.dto';
import { InitDTO } from './dto/init.dto';
import { PixDTO } from './dto/pix.dto';
import { PutMethodDTO } from './dto/put-method.dto';
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
    return this.checkoutService.notification(gatewayId, data);
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

  @Get('payment/:paymentId')
  async slug(@Param('paymentId', ParseIntPipe) paymentId: number) {
    const { code, hasAccount } =
      await this.checkoutService.hasAccount(paymentId);

    return {
      payment: await this.checkoutService.getPaymentDetails(paymentId),
      settings: await this.checkoutService.getPaymentSettings(),
      code: hasAccount ? null : code,
      hasAccount,
    };
  }

  @Post('init')
  async init(@Body() { items, slug, coupon }: InitDTO, @User() user) {
    return {
      payment: await this.checkoutService.init({
        items,
        coupon,
        slug,
        userId: user ? user.id : null,
      }),
      settings: await this.checkoutService.getPaymentSettings(),
    };
  }

  @Put('method/:paymentId')
  async putMethod(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() { methodId }: PutMethodDTO,
  ) {
    return this.checkoutService.putMethod(paymentId, methodId);
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
