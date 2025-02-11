interface IProvider {
  id: number;
  createPaymentPix(args: {
    transactionAmount: number;
    description: string;
    externalReference: string;
    firstName: string;
    lastName: string;
    payerEmail: string;
    payerIdentificationNumber: string;
    payerIdentificationType: string;
    items: any[];
  }): Promise<any>;
  createPaymentCreditCard(args: {
    token: string;
    installments: number;
    transactionAmount: number;
    description: string;
    paymentMethodId: string;
    paymentMethodType: 'credit' | 'debit';
    issuerId: number;
    externalReference: string;
    items: any[];
    firstName: string;
    lastName: string;
    payerEmail: string;
    payerIdentificationNumber: string;
    payerIdentificationType: string;
    notificationUrl: string;
  }): Promise<any>;
  createSubscription(
    cardToken: string,
    planId: number,
    email: string,
    total: number,
    reference: string,
    reason: string,
  ): Promise<any>;
  getStatusId(status: string): number;
  getBrandId(brand: string): number;
  getPayment(id: string): Promise<any>;
}

export abstract class AbstractProvider implements IProvider {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  abstract getPayment(id: string): Promise<any>;
  abstract getBrandId(brand: string): number;
  abstract getStatusId(status: string): number;
  abstract createPaymentPix(args: {
    transactionAmount: number;
    description: string;
    externalReference: string;
    firstName: string;
    lastName: string;
    payerEmail: string;
    payerIdentificationNumber: string;
    payerIdentificationType: string;
    items: any[];
  }): Promise<any>;

  abstract createPaymentCreditCard(args: {
    token: string;
    installments: number;
    transactionAmount: number;
    description: string;
    paymentMethodId: string;
    paymentMethodType: 'credit' | 'debit';
    issuerId: number;
    externalReference: string;
    items: any[];
    firstName: string;
    lastName: string;
    payerEmail: string;
    payerIdentificationNumber: string;
    payerIdentificationType: string;
  }): Promise<any>;

  abstract createSubscription(
    cardToken: string,
    planId: number,
    email: string,
    total: number,
    reference: string,
    reason: string,
  ): Promise<any>;
}
