import { DeleteDTO } from '@hedhog/core';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { PaymentService } from './payment.service';
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
    get(id: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(id: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=payment.controller.d.ts.map