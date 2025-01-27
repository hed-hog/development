import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';
import { LocaleService } from '@hedhog/locale';
export declare class PaymentStatusService {
    private readonly prismaService;
    private readonly paginationService;
    private readonly localeService;
    private readonly modelName;
    private readonly foreignKey;
    constructor(prismaService: PrismaService, paginationService: PaginationService, localeService: LocaleService);
    list(locale: string, paginationParams: PaginationDTO): Promise<{
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
    delete({ ids }: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=payment-status.service.d.ts.map