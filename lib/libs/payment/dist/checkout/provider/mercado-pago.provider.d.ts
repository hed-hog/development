import { AbstractProvider } from './abstract,provider';
export declare class MercadoPagoProvider extends AbstractProvider {
    private setting;
    constructor(setting: Record<string, string>);
    createPaymentIntent(amount: number, currency: string): Promise<any>;
    createSubscription(priceId: string, customerId: string): Promise<any>;
}
//# sourceMappingURL=mercado-pago.provider.d.ts.map