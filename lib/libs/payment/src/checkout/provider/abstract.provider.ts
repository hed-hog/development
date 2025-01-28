interface IProvider {
  id: number;
  createPaymentIntent(amount: number, currency: string): Promise<any>;
  createSubscription(
    cardToken: string,
    planId: number,
    email: string,
    total: number,
    reference: string,
    reason: string,
  ): Promise<any>;
}

export abstract class AbstractProvider implements IProvider {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  abstract createPaymentIntent(amount: number, cuency: string): Promise<any>;
  abstract createSubscription(
    cardToken: string,
    planId: number,
    email: string,
    total: number,
    reference: string,
    reason: string,
  ): Promise<any>;
}
