import { DocumentService } from './document.service';
import { CreatePersonDocumentDTO } from './dto/create-document.dto';
import { UpdatePersonDocumentDTO } from './dto/update-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    create(personId: number, data: CreatePersonDocumentDTO): Promise<any>;
    list(personId: number, typeId?: number, documentId?: number): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    update(id: number, data: UpdatePersonDocumentDTO): Promise<any>;
    delete(documentId: number): Promise<any>;
}
//# sourceMappingURL=document.controller.d.ts.map