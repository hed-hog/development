interface IProvider {
    createPaymentIntent(amount: number, currency: string): Promise<any>;
    createSubscription(cardToken: string, planId: number, email: string, total: number, reference: string, reason: string): Promise<any>;
}
export declare abstract class AbstractProvider implements IProvider {
    abstract createPaymentIntent(amount: number, currency: string): Promise<any>;
    abstract createSubscription(cardToken: string, planId: number, email: string, total: number, reference: string, reason: string): Promise<any>;
}
export {};
//# sourceMappingURL=abstract,provider.d.ts.map