import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SubscriptionListenerService {
  constructor(private readonly prismaService: PrismaService) {}

  @OnEvent('payment.paid')
  async handlePaymentPaidEvent(paymentId: number) {
    console.log(
      'SubscriptionListenerService',
      'OnEvent',
      'payment.paid',
      paymentId,
    );

    const payment = await this.prismaService.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {},
    });
  }
  @OnEvent('payment.refunded')
  async handlePaymentRefoundedEvent(paymentId: number) {
    console.log(
      'SubscriptionListenerService',
      'OnEvent',
      'payment.refunded',
      paymentId,
    );
  }
  @OnEvent('payment.canceled')
  async handlePaymentCanceledEvent(paymentId: number) {
    console.log(
      'SubscriptionListenerService',
      'OnEvent',
      'payment.canceled',
      paymentId,
    );
  }
}
