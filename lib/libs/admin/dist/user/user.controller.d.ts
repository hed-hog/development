import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(paginationParams: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    listRoles(userId: number, paginationParams: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    updateRoles(userId: number, data: UpdateIdsDTO): Promise<any>;
    show(userId: number): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(userId: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=user.controller.d.ts.map