import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { ItemService } from './item.service';
import { DeleteDTO } from '@hedhog/core';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
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
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    create(data: CreateDTO): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(id: number, data: UpdateDTO): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    delete(data: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=item.controller.d.ts.map