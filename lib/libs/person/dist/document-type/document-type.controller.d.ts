import { DeleteDTO } from '../dto/delete.dto';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDTO } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDTO } from './dto/update-document-type.dto';
export declare class DocumentTypeController {
    private readonly documentTypeService;
    constructor(documentTypeService: DocumentTypeService);
    create(data: CreateDocumentTypeDTO): Promise<any>;
    list(paginationParams: any, locale: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(id: number): Promise<any>;
    update(id: number, data: UpdateDocumentTypeDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=document-type.controller.d.ts.map