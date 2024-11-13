import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreatePersonDocumentDTO } from './dto/create-document.dto';
import { UpdatePersonDocumentDTO } from './dto/update-document.dto';
export declare class DocumentService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    create(personId: number, data: CreatePersonDocumentDTO): Promise<any>;
    list(personId?: number, typeId?: number, documentId?: number): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    update(documentId: number, data: UpdatePersonDocumentDTO): Promise<any>;
    delete(documentId: number): Promise<any>;
}
//# sourceMappingURL=document.service.d.ts.map