import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { OrderDTO } from './dto/order.dto';
export declare class MenuService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    getMenus(userId: number, menuId?: number): Promise<any[]>;
    getSystemMenu(userId: number): Promise<any[]>;
    getMenu(paginationParams: PaginationDTO): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(menuId: number): Promise<any>;
    create({ name, url, icon, order, menuId }: CreateDTO): Promise<any>;
    update({ id, data }: {
        id: number;
        data: UpdateDTO;
    }): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
    updateOrder({ ids }: OrderDTO): Promise<void>;
}
//# sourceMappingURL=menu.service.d.ts.map