import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreatePersonDTO } from './dto/create-person.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
export declare class PersonService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    create(data: CreatePersonDTO): Promise<any>;
    list(locale: string, paginationParams: PaginationDTO): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(id: number): Promise<any>;
    update(id: number, data: UpdatePersonDTO): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=person.service.d.ts.map