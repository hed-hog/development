import { AbstractProvider } from './abstract,provider';

export class MercadoPagoProvider extends AbstractProvider {
  constructor(private setting: Record<string, string>) {
    super();
  }

  async createPaymentIntent(amount: number, currency: string): Promise<any> {
    return { amount, currency, setting: this.setting };
  }

  async createSubscription(priceId: string, customerId: string): Promise<any> {
    return { priceId, customerId, setting: this.setting };
  }
}
