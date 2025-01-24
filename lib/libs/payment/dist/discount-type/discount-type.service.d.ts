import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';
export declare class DiscountTypeService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    list(paginationParams: PaginationDTO): Promise<{
        total: any;
        lastPage: number;
        page: number;
        pageSize: number;
        prev: number;
        next: number;
        data: any;
    }>;
    get(id: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update({ id, data }: {
        id: number;
        data: UpdateDTO;
    }): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=discount-type.service.d.ts.map