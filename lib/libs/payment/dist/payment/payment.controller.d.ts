import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { PaymentService } from './payment.service';
import { DeleteDTO } from '@hedhog/core';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    list(paginationParams: any): Promise<{
        total: any;
        lastPage: number;
        page: number;
        pageSize: number;
        prev: number;
        next: number;
        data: any;
    }>;
    get(id: number): Promise<{
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
    create(data: CreateDTO): Promise<{
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
    update(id: number, data: UpdateDTO): Promise<{
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
    delete(data: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=payment.controller.d.ts.map