import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';
export declare class PaymentMethodService {
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
    get(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
    }>;
    create(data: CreateDTO): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
    }>;
    update({ id, data }: {
        id: number;
        data: UpdateDTO;
    }): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
    }>;
    delete({ ids }: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=payment-method.service.d.ts.map