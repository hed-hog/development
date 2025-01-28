import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';
import { InitDTO } from './dto/init.dto';
import { SetCouponDTO } from './dto/set-coupon.dto';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    paymentSettings(): Promise<{
        publicKey: string;
    } | {
        publicKey?: undefined;
    }>;
    payment(data: CreateDTO): Promise<any>;
    init({ items, slug, couponId }: InitDTO, user: any): Promise<any>;
    coupon({ code, slug }: SetCouponDTO): Promise<{
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
    subscription({ priceId, customerId }: any): Promise<any>;
}
//# sourceMappingURL=checkout.controller.d.ts.map