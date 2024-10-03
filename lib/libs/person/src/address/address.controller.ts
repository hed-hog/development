import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdatePersonAddressDTO } from './dto/update-address.dto';
import { CreatePersonAddressDTO } from './dto/create-address.dto';

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
  getAddress(@Param('personId', ParseIntPipe) personId: number) {
    return this.addressService.getAddress(personId);
  }

  @Get(':addressId')
  getAddressById(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('addressId', ParseIntPipe) typeId: number,
  ) {
    return this.addressService.getAddressById(personId, typeId);
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
