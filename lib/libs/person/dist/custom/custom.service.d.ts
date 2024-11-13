import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreatePersonCustomDTO } from './dto/create-custom.dto';
import { UpdatePersonCustomDTO } from './dto/update-custom.dto';
export declare class CustomService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    create(personId: number, data: CreatePersonCustomDTO): Promise<any>;
    list(personId: number, customId?: number, typeId?: number): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    update(customId: number, data: UpdatePersonCustomDTO): Promise<any>;
    delete(customId: number): Promise<any>;
}
//# sourceMappingURL=custom.service.d.ts.map