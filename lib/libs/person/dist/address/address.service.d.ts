import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { CreatePersonAddressDTO } from './dto/create-address.dto';
import { UpdatePersonAddressDTO } from './dto/update-address.dto';
export declare class AddressService {
    private readonly prismaService;
    private readonly paginationService;
    constructor(prismaService: PrismaService, paginationService: PaginationService);
    create(personId: number, data: CreatePersonAddressDTO): Promise<any>;
    list(personId?: number, typeId?: number, addressId?: number): Promise<any>;
    update(addressId: number, data: UpdatePersonAddressDTO): Promise<any>;
    delete(addressId: number): Promise<any>;
}
//# sourceMappingURL=address.service.d.ts.map