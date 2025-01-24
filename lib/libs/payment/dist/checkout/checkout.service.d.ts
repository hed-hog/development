import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { SettingService } from '@hedhog/setting';
import { AbstractProvider } from './provider/abstract,provider';
export declare class CheckoutService {
    private readonly prismaService;
    private readonly paginationService;
    private readonly settingService;
    private providerId;
    private setting;
    constructor(prismaService: PrismaService, paginationService: PaginationService, settingService: SettingService);
    getProvider(): Promise<AbstractProvider>;
    createPaymentIntent(amount: number, currency: string): Promise<any>;
    createSubscription(priceId: string, customerId: string): Promise<any>;
}
//# sourceMappingURL=checkout.service.d.ts.map