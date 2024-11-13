import { CustomService } from './custom.service';
import { CreatePersonCustomDTO } from './dto/create-custom.dto';
import { UpdatePersonCustomDTO } from './dto/update-custom.dto';
export declare class CustomController {
    private readonly customService;
    constructor(customService: CustomService);
    create(personId: number, data: CreatePersonCustomDTO): Promise<any>;
    list(personId: number, typeId?: number, customId?: number): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    update(id: number, data: UpdatePersonCustomDTO): Promise<any>;
    delete(CustomId: number): Promise<any>;
}
//# sourceMappingURL=custom.controller.d.ts.map