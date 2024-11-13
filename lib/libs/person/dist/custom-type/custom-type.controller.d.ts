import { DeleteDTO } from '../dto/delete.dto';
import { CustomTypeService } from './custom-type.service';
import { CreateCustomTypeDTO } from './dto/create-custom-type.dto';
import { UpdateCustomTypeDTO } from './dto/update-custom-type.dto';
export declare class CustomTypeController {
    private readonly customTypeService;
    constructor(customTypeService: CustomTypeService);
    create(data: CreateCustomTypeDTO): Promise<any>;
    list(paginationParams: any, locale: string): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(id: number): Promise<any>;
    update(id: number, data: UpdateCustomTypeDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=custom-type.controller.d.ts.map