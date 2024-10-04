import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdatePersonAddressDTO } from './dto/update-address.dto';
import { CreatePersonAddressDTO } from './dto/create-address.dto';
import { OptionalParseIntPipe } from '../pipes/optional-parse-int.pipe';

@Controller('persons/:personId/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreatePersonAddressDTO,
  ) {
    return this.addressService.create(personId, data);
  }

  @Get()
  getAddress(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) addressId?: number,
  ) {
    if (addressId) {
      return this.addressService.getAddressById(addressId);
    }
    if (typeId) {
      return this.addressService.getAddressByTypeId(personId, typeId);
    }
    return this.addressService.getAddress(personId);
  }

  @Patch(':addressId')
  update(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() data: UpdatePersonAddressDTO,
  ) {
    return this.addressService.update(addressId, data);
  }

  @Delete(':addressId')
  remove(@Param('addressId', ParseIntPipe) addressId: number) {
    return this.addressService.remove(addressId);
  }
}
