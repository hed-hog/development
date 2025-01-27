import { PrismaService } from '@hedhog/prisma';
import { SettingService } from '@hedhog/setting';
import { HttpService } from '@nestjs/axios';
import { PaymentService } from '../payment/payment.service';
import { CreateDTO } from './dto/create.dto';
import { AbstractProvider } from './provider/abstract,provider';
export declare class CheckoutService {
    private readonly prismaService;
    private readonly settingService;
    private readonly paymentService;
    private readonly httpService;
    private providerId;
    private setting;
    constructor(prismaService: PrismaService, settingService: SettingService, paymentService: PaymentService, httpService: HttpService);
    getProvider(): Promise<AbstractProvider>;
    createPaymentIntent({ token, paymentMethodId, issuerId, installments, identificationNumber, orderId, cardFirstSixDigits, cardLastFourDigits, name, email, phone, couponId, }: CreateDTO): Promise<any>;
    createSubscription(priceId: string, customerId: string): Promise<any>;
    init(slug?: string, person_id?: number): Promise<{
        card_brand: {
            name: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            slug: string;
        };
        person: {
            name: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            type_id: number;
            photo_id: number | null;
            birth_at: Date | null;
        };
        payment_item: ({
            item: {
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                slug: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            delivered: number;
            id: number;
            created_at: Date;
            updated_at: Date;
            item_id: number;
            payment_id: number;
            unit_price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
        })[];
        payment_method: {
            name: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            slug: string;
        };
        payment_status: {
            id: number;
            created_at: Date;
            updated_at: Date;
            slug: string;
        };
    } & {
        currency: string;
        document: string | null;
        delivered: number;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        coupon_id: number | null;
        person_id: number | null;
        gateway_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        status_id: number;
        payment_at: Date | null;
        method_id: number | null;
        brand_id: number | null;
        installments: number;
        discount: import("@prisma/client/runtime/library").Decimal;
    }>;
}
//# sourceMappingURL=checkout.service.d.ts.map