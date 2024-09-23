import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    getPermissions(paginationParams: any): Promise<any>;
    show(permissionId: number): Promise<any>;
    create(data: CreateDTO): any;
    update(permissionId: number, data: UpdateDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=permission.controller.d.ts.map