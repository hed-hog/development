import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { ScreenService } from './screen.service';
export declare class ScreenController {
    private readonly screenService;
    constructor(screenService: ScreenService);
    getScreens(paginationParams: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    show(screenId: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(screenId: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=screen.controller.d.ts.map