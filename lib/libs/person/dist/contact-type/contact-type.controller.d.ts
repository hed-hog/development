import { DeleteDTO } from '../dto/delete.dto';
import { ContactTypeService } from './contact-type.service';
import { CreateContactTypeDTO } from './dto/create-contact-type.dto';
import { UpdateContactTypeDTO } from './dto/update-contact-type.dto';
export declare class ContactTypeController {
    private readonly contactTypeService;
    constructor(contactTypeService: ContactTypeService);
    create(data: CreateContactTypeDTO): Promise<any>;
    getContactTypes(paginationParams: any, locale: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    getContactTypeById(id: number): Promise<any>;
    update(id: number, data: UpdateContactTypeDTO): Promise<any>;
    remove(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=contact-type.controller.d.ts.map