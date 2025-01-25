import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { PaymentStatusService } from './payment-status.service';
import { DeleteDTO } from '@hedhog/core';
export declare class PaymentStatusController {
    private readonly paymentStatusService;
    constructor(paymentStatusService: PaymentStatusService);
    list(locale: any, paginationParams: any): Promise<{
        total: any;
        lastPage: number;
        page: number;
        pageSize: number;
        prev: number;
        next: number;
        data: any;
    }>;
    get(id: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(id: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=payment-status.controller.d.ts.map