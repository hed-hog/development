import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SubscriptionListenerService {
  constructor() {}

  @OnEvent('payment.paid')
  async handlePaymentPaidEvent(payload: any) {
    console.log(
      'SubscriptionListenerService',
      'OnEvent',
      'payment.paid',
      payload,
    );
  }
  @OnEvent('payment.refunded')
  async handlePaymentRefoundedEvent(payload: any) {
    console.log(
      'SubscriptionListenerService',
      'OnEvent',
      'payment.refunded',
      payload,
    );
  }
  @OnEvent('payment.canceled')
  async handlePaymentCanceledEvent(payload: any) {
    console.log(
      'SubscriptionListenerService',
      'OnEvent',
      'payment.canceled',
      payload,
    );
  }
}
