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
    get(id: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(id: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=item.controller.d.ts.map