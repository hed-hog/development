import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    init(slug: string, user: any): Promise<({
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
    }) | {
        user: any;
        slug: string;
    }>;
    payment(data: CreateDTO): Promise<any>;
    subscription({ priceId, customerId }: any): Promise<any>;
}
//# sourceMappingURL=checkout.controller.d.ts.map