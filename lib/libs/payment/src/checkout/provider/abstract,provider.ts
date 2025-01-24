interface IProvider {
  createPaymentIntent(amount: number, currency: string): Promise<any>;
  createSubscription(priceId: string, customerId: string): Promise<any>;
}

export abstract class AbstractProvider implements IProvider {
  abstract createPaymentIntent(amount: number, currency: string): Promise<any>;
  abstract createSubscription(
    priceId: string,
    customerId: string,
  ): Promise<any>;
}
