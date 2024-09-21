import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
export declare class ScreenService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    getScreens(paginationParams: PaginationDTO): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(screenId: number): Promise<any>;
    create({ name, slug, description, icon }: CreateDTO): Promise<any>;
    update({ id, data }: {
        id: number;
        data: UpdateDTO;
    }): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=screen.service.d.ts.map