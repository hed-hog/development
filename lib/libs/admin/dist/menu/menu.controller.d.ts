import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { MenuService } from './menu.service';
import { OrderDTO } from './dto/order.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getSystemMenu({ id }: {
        id: any;
    }): Promise<any[]>;
    getMenu(paginationParams: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    listRoles(menuId: number, paginationParams: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    listScreens(menuId: number, paginationParams: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    updateRoles(menuId: number, data: UpdateIdsDTO): Promise<any>;
    updateScreens(menuId: number, data: UpdateIdsDTO): Promise<any>;
    show(menuId: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(menuId: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
    updateOrder(data: OrderDTO): Promise<void>;
}
//# sourceMappingURL=menu.controller.d.ts.map