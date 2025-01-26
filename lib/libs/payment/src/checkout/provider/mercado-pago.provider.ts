import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AbstractProvider } from './abstract,provider';

export class MercadoPagoProvider extends AbstractProvider {
  private baseUrl = 'https://api.mercadopago.com';

  constructor(
    private setting: Record<string, string>,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  async createPaymentIntent(amount: number, currency: string): Promise<any> {
    return { amount, currency, setting: this.setting };
  }

  async createSubscription(priceId: string, customerId: string): Promise<any> {
    return { priceId, customerId, setting: this.setting };
  }

  async getPaymentMethods() {
    if (!this.setting['payment-mercado-pago-token']) {
      throw new BadRequestException(
        `You must set the storage provider in the setting.`,
      );
    }

    const { data } = await lastValueFrom(
      this.httpService.request({
        url: `${this.baseUrl}/v1/payment_methods`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.setting['payment-mercado-pago-token']}`,
        },
      }),
    );

    return data;
  }
}
