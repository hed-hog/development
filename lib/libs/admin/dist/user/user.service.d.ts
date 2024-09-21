import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
export declare class UserService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    getUsers(paginationParams: PaginationDTO): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(userId: number): Promise<any>;
    hashPassword(password: string): Promise<string>;
    create({ email, name, password }: CreateDTO): Promise<any>;
    update({ id, data }: {
        id: number;
        data: UpdateDTO;
    }): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=user.service.d.ts.map