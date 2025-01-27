import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { GatewayService } from './gateway.service';
import { DeleteDTO } from '@hedhog/core';
export declare class GatewayController {
    private readonly gatewayService;
    constructor(gatewayService: GatewayService);
    list(paginationParams: any): Promise<{
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
    update(id: number, data: UpdateDTO): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
    }>;
    delete(data: DeleteDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=gateway.controller.d.ts.map