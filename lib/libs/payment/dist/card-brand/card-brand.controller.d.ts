import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { CardBrandService } from './card-brand.service';
import { DeleteDTO } from '@hedhog/core';
export declare class CardBrandController {
    private readonly cardBrandService;
    constructor(cardBrandService: CardBrandService);
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
//# sourceMappingURL=card-brand.controller.d.ts.map