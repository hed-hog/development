import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';
export declare class PaymentService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    list(paginationParams: PaginationDTO): Promise<{
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
    create(data: CreateDTO): Promise<{
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
    update({ id, data }: {
        id: number;
        data: UpdateDTO;
    }): Promise<{
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
    delete({ ids }: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=payment.service.d.ts.map