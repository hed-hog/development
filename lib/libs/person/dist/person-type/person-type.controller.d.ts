import { DeleteDTO } from '../dto/delete.dto';
import { CreatePersonTypeDTO } from './dto/create-person-type.dto';
import { UpdatePersonTypeDTO } from './dto/update-person-type.dto';
import { PersonTypeService } from './person-type.service';
export declare class PersonTypeController {
    private readonly personTypeService;
    constructor(personTypeService: PersonTypeService);
    create(data: CreatePersonTypeDTO): Promise<any>;
    list(paginationParams: any, locale: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(id: number, locale: any): Promise<any>;
    update(id: number, data: UpdatePersonTypeDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=person-type.controller.d.ts.map