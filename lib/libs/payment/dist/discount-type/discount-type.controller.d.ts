import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DiscountTypeService } from './discount-type.service';
import { DeleteDTO } from '@hedhog/core';
export declare class DiscountTypeController {
    private readonly discountTypeService;
    constructor(discountTypeService: DiscountTypeService);
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
//# sourceMappingURL=discount-type.controller.d.ts.map