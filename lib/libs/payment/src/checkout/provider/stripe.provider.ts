import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PaymentCardBrandEnum, PaymentStatusEnum } from '../../index';
import { AbstractProvider } from './abstract.provider';

export class StripeProvider extends AbstractProvider {
  private readonly baseUrl = 'https://api.stripe.com/v1';
  private readonly headers: Record<string, string>;
  private gatewayId: number;

  constructor(
    id: number,
    private readonly setting: Record<string, string>,
    private readonly httpService: HttpService,
  ) {
    super(id);
    this.gatewayId = id;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${this.setting['payment-stripe-token']}`,
    };
  }

  private async makeRequest<T>(
    url: string,
    method: 'POST' | 'GET',
    data?: Record<string, any>,
  ): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          url,
          method,
          headers: this.headers,
          data: data ? new URLSearchParams(data).toString() : undefined,
        }),
      );

      return response.data;
    } catch (error: any) {
      throw new BadRequestException(
        error?.response
          ? error?.response?.data?.error?.message
          : error?.message,
      );
    }
  }

  async getPayment(id: string) {
    return this.makeRequest(`${this.baseUrl}/payment_intents/${id}`, 'GET');
  }

  async createPaymentPix({
    description,
    externalReference,
    transactionAmount,
    payerEmail,
  }) {
    const data = {
      amount: Math.round(transactionAmount * 100), // Stripe expects amounts in cents
      currency: 'brl',
      payment_method_types: ['pix'],
      description,
      metadata: { external_reference: externalReference },
      receipt_email: payerEmail,
    };

    const response = await this.makeRequest(
      `${this.baseUrl}/payment_intents`,
      'POST',
      data,
    );

    return response;
  }

  async createPaymentCreditCard({
    token,
    transactionAmount,
    description,
    paymentMethodId,
    externalReference,
    payerEmail,
  }) {
    const data = {
      amount: Math.round(transactionAmount * 100), // Stripe expects amounts in cents
      currency: 'usd', // Adjust currency as needed
      payment_method: token,
      confirmation_method: 'manual',
      confirm: true,
      description,
      metadata: { external_reference: externalReference },
      receipt_email: payerEmail,
    };

    const response = await this.makeRequest(
      `${this.baseUrl}/payment_intents`,
      'POST',
      data,
    );

    return response;
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
      customer: cardToken,
      items: [{ price: planId.toString() }],
      metadata: { email, total: total.toString(), reference, reason },
    };

    const response = await this.makeRequest<any>(
      `${this.baseUrl}/subscriptions`,
      'POST',
      data,
    );

    return response;
  }

  async getMethodsAvailable() {
    return this.makeRequest(`${this.baseUrl}/payment_methods`, 'GET');
  }

  getBrandId(brand: string) {
    switch (brand) {
      case 'visa':
        return PaymentCardBrandEnum.VISA;
      case 'mastercard':
        return PaymentCardBrandEnum.MASTERCARD;
      case 'amex':
        return PaymentCardBrandEnum.AMERICAN_EXPRESS;
      case 'diners':
        return PaymentCardBrandEnum.DINERS_CLUB;
      case 'discover':
        return PaymentCardBrandEnum.DISCOVER;
      case 'jcb':
        return PaymentCardBrandEnum.JCB;
      case 'maestro':
        return PaymentCardBrandEnum.MAESTRO;
      default:
        return undefined;
    }
  }

  getStatusId(status: string) {
    switch (status) {
      case 'succeeded':
        return PaymentStatusEnum.PAID;
      case 'requires_payment_method':
      case 'requires_confirmation':
        return PaymentStatusEnum.PENDING;
      case 'requires_action':
        return PaymentStatusEnum.PROCESSING;
      case 'canceled':
        return PaymentStatusEnum.CANCELED;
      default:
        return PaymentStatusEnum.REJECTED;
    }
  }
}
