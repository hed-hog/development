import { ContactService } from './contact.service';
import { CreatePersonContactDTO } from './dto/create-contact.dto';
import { UpdatePersonContactDTO } from './dto/update-contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(personId: number, data: CreatePersonContactDTO): Promise<any>;
    list(personId: number, typeId?: number, contactId?: number): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    update(id: number, data: UpdatePersonContactDTO): Promise<any>;
    delete(ContactId: number): Promise<any>;
}
//# sourceMappingURL=contact.controller.d.ts.map