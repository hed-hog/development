import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { PaymentCardBrandEnum, PaymentStatusEnum } from '../../index';
import { AbstractProvider } from './abstract.provider';

export class MercadoPagoProvider extends AbstractProvider {
  private readonly baseUrl = 'https://api.mercadopago.com';
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.setting['payment-mercado-pago-token']}`,
    };
  }

  private async makeRequest<T>(
    url: string,
    method: 'POST' | 'GET',
    data?: any,
  ): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          url,
          method,
          headers: Object.assign({}, this.headers, {
            'X-Idempotency-Key': uuidv4(),
          }),
          data,
        }),
      );

      return response.data;
    } catch (error: any) {
      throw new BadRequestException(
        error?.response ? error?.response?.data?.message : error?.message,
      );
    }
  }

  async getPayment(id: string) {
    return this.makeRequest(`${this.baseUrl}/v1/payments/${id}`, 'GET');
  }

  async createPaymentPix({
    description,
    externalReference,
    firstName,
    lastName,
    payerEmail,
    payerIdentificationNumber,
    payerIdentificationType,
    items,
    transactionAmount,
  }) {
    const data = {
      transaction_amount: transactionAmount,
      description,
      payment_method_id: 'pix',
      external_reference: externalReference,
      payer: {
        email: payerEmail,
        identification: {
          number: payerIdentificationNumber,
          type: payerIdentificationType,
        },
      },
      additional_info: {
        items,
        payer: {
          first_name: firstName,
          last_name: lastName,
        },
      },
      notification_url: `${this.setting['url']}/checkout/notification/${this.gatewayId}`,
    };

    const response = await this.makeRequest(
      `${this.baseUrl}/v1/payments`,
      'POST',
      data,
    );

    return response;
  }

  async createPaymentCreditCard({
    token,
    installments,
    transactionAmount,
    description,
    paymentMethodId,
    paymentMethodType,
    issuerId,
    externalReference,
    items,
    payerEmail,
    payerIdentificationNumber,
    payerIdentificationType,
    firstName,
    lastName,
  }) {
    const avaliables = await this.getMethodsAvailable();

    if (avaliables instanceof Array) {
      const isAvaliable = avaliables.find(
        (method) => method.id === paymentMethodId,
      );

      if (!isAvaliable) {
        throw new BadRequestException(
          `The payment method is not available for this transaction.`,
        );
      }

      if (isAvaliable.min_allowed_amount > Number(transactionAmount)) {
        throw new BadRequestException(
          `The minimum amount for this payment method is ${isAvaliable.min_allowed_amount}.`,
        );
      }

      if (isAvaliable.max_allowed_amount < Number(transactionAmount)) {
        throw new BadRequestException(
          `The maximum amount for this payment method is ${isAvaliable.max_allowed_amount}.`,
        );
      }
    }

    const data = {
      token,
      installments,
      transaction_amount: transactionAmount,
      description,
      payment_method_id: paymentMethodId,
      issuer_id: issuerId,
      external_reference: externalReference,
      additional_info: {
        items,
        payer: {
          first_name: firstName,
          last_name: lastName,
        },
      },
      payer: {
        email: payerEmail,
        identification: {
          number: payerIdentificationNumber,
          type: payerIdentificationType,
        },
      },
      notification_url: `${this.setting['url']}/checkout/notification/${this.gatewayId}`,
    };

    const response = await this.makeRequest(
      `${this.baseUrl}/v1/payments`,
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
      preapproval_plan_id: planId,
      card_token_id: cardToken,
      payer_email: email,
      transaction_amount: total,
      external_reference: reference,
      reason,
      status: 'authorized',
    };

    const response = await this.makeRequest(
      `${this.baseUrl}/preapproval`,
      'POST',
      data,
    );
    return {
      cardToken,
      planId,
      email,
      total,
      reference,
      reason,
      setting: this.setting,
      response,
    };
  }

  async getMethodsAvailable() {
    return this.makeRequest(`${this.baseUrl}/v1/payment_methods`, 'GET');
  }

  async getPaymentMethods() {
    if (!this.setting['payment-mercado-pago-token']) {
      throw new BadRequestException(
        `You must set the storage provider in the setting.`,
      );
    }

    return this.makeRequest(`${this.baseUrl}/v1/payment_methods`, 'GET');
  }

  getBrandId(brand: string) {
    switch (brand) {
      case 'visa':
        return PaymentCardBrandEnum.VISA;
      case 'master':
        return PaymentCardBrandEnum.MASTERCARD;
      case 'amex':
        return PaymentCardBrandEnum.AMERICAN_EXPRESS;
      case 'diners':
        return PaymentCardBrandEnum.DINERS_CLUB;
      case 'elo':
        return PaymentCardBrandEnum.ELO;
      case 'hipercard':
        return PaymentCardBrandEnum.HIPERCARD;
      case 'aura':
        return PaymentCardBrandEnum.AURA;
      case 'jcb':
        return PaymentCardBrandEnum.JCB;
      case 'discover':
        return PaymentCardBrandEnum.JCB;
      case 'maestro':
        return PaymentCardBrandEnum.MAESTRO;
    }
  }

  getStatusId(status: string) {
    switch (status) {
      case 'approved':
      case 'authorized':
        return PaymentStatusEnum.PAID;
      case 'pending':
        return PaymentStatusEnum.PENDING;
      case 'in_process':
        return PaymentStatusEnum.PROCESSING;
      case 'rejected':
        return PaymentStatusEnum.REJECTED;
      case 'cancelled':
        return PaymentStatusEnum.CANCELED;
      case 'refunded':
      case 'charged_back':
        return PaymentStatusEnum.REFUNDED;
      case 'expired':
        return PaymentStatusEnum.EXPIRED;

      default:
        return 8;
    }
  }
}
