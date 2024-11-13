import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDocumentTypeDTO } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDTO } from './dto/update-document-type.dto';
import { DeleteDTO } from '../dto/delete.dto';
export declare class DocumentTypeService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    create(data: CreateDocumentTypeDTO): Promise<any>;
    list(locale: string, paginationParams: PaginationDTO): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(id: number): Promise<any>;
    update(id: number, data: UpdateDocumentTypeDTO): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=document-type.service.d.ts.map