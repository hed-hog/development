import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    init(slug: string, user: any): Promise<{
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
        document: string;
        delivered: number;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        person_id: number;
        gateway_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        status_id: number;
        payment_at: Date | null;
        method_id: number;
        brand_id: number | null;
        installments: number;
    }>;
    create({ amount, currency }: CreateDTO): Promise<any>;
    createSubscription({ priceId, customerId }: any): Promise<any>;
}
//# sourceMappingURL=checkout.controller.d.ts.map