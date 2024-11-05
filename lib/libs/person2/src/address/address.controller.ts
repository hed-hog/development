import { Role } from '@hedhog/utils';
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
import { OptionalParseIntPipe } from '../pipes/optional-parse-int.pipe';
import { AddressService } from './address.service';
import { CreatePersonAddressDTO } from './dto/create-address.dto';
import { UpdatePersonAddressDTO } from './dto/update-address.dto';

@Role()
@Controller('person/:personId/address')
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
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) addressId?: number,
  ) {
    if (addressId) {
      return this.addressService.list(personId, null, addressId);
    }
    if (typeId) {
      return this.addressService.list(personId, typeId);
    }
    return this.addressService.list(personId);
  }

  @Patch(':addressId')
  update(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() data: UpdatePersonAddressDTO,
  ) {
    return this.addressService.update(addressId, data);
  }

  @Delete(':addressId')
  delete(@Param('addressId', ParseIntPipe) addressId: number) {
    return this.addressService.delete(addressId);
  }
}
