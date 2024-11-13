import { LocaleService } from '@hedhog/admin';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { DeleteDTO } from '../dto/delete.dto';
import { CreatePersonTypeDTO } from './dto/create-person-type.dto';
import { UpdatePersonTypeDTO } from './dto/update-person-type.dto';
export declare class PersonTypeService {
    private readonly prismaService;
    private readonly paginationService;
    private readonly localeService;
    constructor(prismaService: PrismaService, paginationService: PaginationService, localeService: LocaleService);
    list(locale: string, paginationParams: PaginationDTO): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(locale: string, typeId: number): Promise<any>;
    create({ slug, locale }: CreatePersonTypeDTO): Promise<any>;
    update({ id, data: { locale, slug }, }: {
        id: number;
        data: UpdatePersonTypeDTO;
    }): Promise<any>;
    delete({ ids }: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=person-type.service.d.ts.map