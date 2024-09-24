import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { ScreenService } from './screen.service';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
export declare class ScreenController {
    private readonly screenService;
    constructor(screenService: ScreenService);
    getScreens(paginationParams: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    listRoles(screenId: number): Promise<any>;
    listRoutes(screenId: number): Promise<any>;
    updateRoles(screenId: number, data: UpdateIdsDTO): Promise<any>;
    updateRoutes(screenId: number, data: UpdateIdsDTO): Promise<any>;
    show(screenId: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(screenId: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=screen.controller.d.ts.map