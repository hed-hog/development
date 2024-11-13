import { AddressService } from './address.service';
import { CreatePersonAddressDTO } from './dto/create-address.dto';
import { UpdatePersonAddressDTO } from './dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(personId: number, data: CreatePersonAddressDTO): Promise<any>;
    list(personId: number, typeId?: number, addressId?: number): Promise<any>;
    update(addressId: number, data: UpdatePersonAddressDTO): Promise<any>;
    delete(addressId: number): Promise<any>;
}
//# sourceMappingURL=address.controller.d.ts.map