import { PrismaService } from '@hedhog/prisma';
import { SettingService } from '@hedhog/setting';
import { HttpService } from '@nestjs/axios';
import { OnModuleInit } from '@nestjs/common';
import { PaymentService } from '../payment/payment.service';
import { CreateDTO } from './dto/create.dto';
import { AbstractProvider } from './provider/abstract.provider';
export declare class CheckoutService implements OnModuleInit {
    private readonly httpService;
    private readonly prismaService;
    private readonly settingService;
    private readonly paymentService;
    private providerLoadedAt;
    private provider;
    private providerId;
    private setting;
    constructor(httpService: HttpService, prismaService: PrismaService, settingService: SettingService, paymentService: PaymentService);
    onModuleInit(): Promise<void>;
    init({ items, slug, userId, couponId, }: {
        items: number[];
        slug?: string;
        userId?: number;
        couponId?: number;
    }): Promise<any>;
    private createPayment;
    private getPaymentItems;
    private updatePaymentItems;
    getPaymentSettings(): Promise<{
        publicKey: string;
    } | {
        publicKey?: undefined;
    }>;
    getProvider(): Promise<AbstractProvider>;
    private getProviderData;
    createPaymentIntent({ token, paymentMethodId, issuerId, installments, identificationNumber, orderId, cardFirstSixDigits, cardLastFourDigits, name, email, phone, couponId, }: CreateDTO): Promise<any>;
    createSubscription(priceId: string, customerId: string): Promise<any>;
    getNewSlug(): any;
    private getPersonId;
    private getPaymentBySlug;
    private getPaymentDetails;
    setCoupon(couponCode: string, paymentSlug: string): Promise<{
        currency: string;
        document: string | null;
        delivered: number;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        person_id: number | null;
        gateway_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        status_id: number;
        payment_at: Date | null;
        method_id: number | null;
        brand_id: number | null;
        installments: number;
        coupon_id: number | null;
        discount: import("@prisma/client/runtime/library").Decimal;
    }>;
    private getPaymentWithItems;
    private getCouponWithItems;
    private getItemsFromPaymentAndCoupon;
    private applyCouponDiscount;
}
//# sourceMappingURL=checkout.service.d.ts.map