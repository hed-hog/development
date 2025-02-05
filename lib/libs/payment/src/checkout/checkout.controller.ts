import { Public, User } from '@hedhog/core';
import { PrismaService } from '@hedhog/prisma';
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
    private readonly prismaService: PrismaService,
  ) {}

  /*
   data: {
    action: 'payment.updated',
    api_version: 'v1',
    data: { id: '100911831253' },
    date_created: '2025-02-04T16:57:34Z',
    id: 118949908320,
    live_mode: true,
    type: 'payment',
    user_id: '2048170479'
  },
  gatewayId: 2
  */

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

  @Post('coupon')
  async coupon(@Body() { code, slug }: SetCouponDTO) {
    return this.checkoutService.setCoupon(code, slug);
  }

  @Post('subscription')
  async subscription(@Body() { priceId, customerId }: any) {
    return this.checkoutService.createSubscription(priceId, customerId);
  }
}
