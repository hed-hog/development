import { Public } from '@hedhog/core';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SubscriptionListenerService } from './subscriptionlistener.service';

@Public()
@Controller('subscription-listener')
export class SubscriptionListenerController {
  constructor(
    private readonly subscriptionListenerService: SubscriptionListenerService,
  ) {}

  @Get('show/:paymentId')
  async showPayment(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.subscriptionListenerService.getSubscriptionsByPaymentId(
      paymentId,
    );
  }

  @Get('paid/:paymentId')
  async testPaid(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.subscriptionListenerService.handlePaymentPaidEvent(paymentId);
  }

  @Get('refunded/:paymentId')
  async testRefunded(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.subscriptionListenerService.handlePaymentRefoundedEvent(
      paymentId,
    );
  }

  @Get('canceled/:paymentId')
  async testCanceled(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.subscriptionListenerService.handlePaymentCanceledEvent(
      paymentId,
    );
  }
}
