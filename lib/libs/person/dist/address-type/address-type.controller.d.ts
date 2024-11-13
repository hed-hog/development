import { DeleteDTO } from '../dto/delete.dto';
import { AddressTypeService } from './address-type.service';
import { CreateAddressTypeDTO } from './dto/create-address-type.dto';
import { UpdateAddressTypeDTO } from './dto/update-address-type.dto';
export declare class AddressTypeController {
    private readonly addressTypeService;
    constructor(addressTypeService: AddressTypeService);
    create(data: CreateAddressTypeDTO): Promise<any>;
    list(paginationParams: any, locale: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(id: number): Promise<any>;
    update(id: number, data: UpdateAddressTypeDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=address-type.controller.d.ts.map