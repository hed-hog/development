import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
export declare class PermissionService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    getPermissions(paginationParams: PaginationDTO): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(permissionId: number): Promise<any>;
    create({ name, description }: CreateDTO): Promise<any>;
    update({ id, data }: {
        id: number;
        data: UpdateDTO;
    }): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=permission.service.d.ts.map