import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AbstractProvider } from './abstract.provider';

export class MercadoPagoProvider extends AbstractProvider {
  private baseUrl = 'https://api.mercadopago.com';

  constructor(
    id: number,
    private readonly setting: Record<string, string>,
    private readonly httpService: HttpService,
  ) {
    super(id);
  }

  async createPaymentIntent(): Promise<any> {
    const data = {
      token: '',
      installments: 1,
      transaction_amount: 0,
      description: '',
      payment_method_id: 1,
      issuer_id: '',
      external_reference: '',
      additional_info: {
        items: [],
        payer: '',
      },
      payer: {
        email: '',
        identification: {
          number: '',
          type: 'CPF',
        },
      },
      notification_url: '',
    };

    const response = await lastValueFrom(
      this.httpService.request({
        url: `${this.baseUrl}/v1/payments`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.setting['payment-mercado-pago-token']}`,
        },
        data,
      }),
    );

    return { setting: this.setting, response: response.data };
  }

  async createSubscription(
    cardToken: string,
    planId: number,
    email: string,
    total: number,
    reference: string,
    reason: string,
  ): Promise<any> {
    const data = {
      preapproval_plan_id: planId,
      card_token_id: cardToken,
      payer_email: email,
      transaction_amount: Number(total),
      external_reference: reference,
      reason,
      status: 'authorized',
    };

    const response = await lastValueFrom(
      this.httpService.request({
        url: `https://api.mercadopago.com/preapproval`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.setting['payment-mercado-pago-token']}`,
        },
        data,
      }),
    );

    return {
      cardToken,
      planId,
      email,
      total,
      reference,
      reason,
      setting: this.setting,
      response: response.data,
    };
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
