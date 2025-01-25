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
    get(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
    }>;
    create(data: CreateDTO): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
    }>;
    update(id: number, data: UpdateDTO): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
    }>;
    delete(data: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=discount-type.controller.d.ts.map