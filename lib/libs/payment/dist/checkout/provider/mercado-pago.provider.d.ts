import { HttpService } from '@nestjs/axios';
import { AbstractProvider } from './abstract.provider';
export declare class MercadoPagoProvider extends AbstractProvider {
    private readonly setting;
    private readonly httpService;
    private baseUrl;
    constructor(id: number, setting: Record<string, string>, httpService: HttpService);
    createPaymentIntent(): Promise<any>;
    createSubscription(cardToken: string, planId: number, email: string, total: number, reference: string, reason: string): Promise<any>;
    getPaymentMethods(): Promise<any>;
}
//# sourceMappingURL=mercado-pago.provider.d.ts.map