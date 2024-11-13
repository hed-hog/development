import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreatePersonContactDTO } from './dto/create-contact.dto';
import { UpdatePersonContactDTO } from './dto/update-contact.dto';
export declare class ContactService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    create(personId: number, data: CreatePersonContactDTO): Promise<any>;
    list(personId?: number, typeId?: number, contactId?: number): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    update(contactId: number, data: UpdatePersonContactDTO): Promise<any>;
    delete(contactId: number): Promise<any>;
}
//# sourceMappingURL=contact.service.d.ts.map