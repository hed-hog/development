import { Role, OptionalParseIntPipe } from '@hedhog/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { PersonAddressService } from './person-address.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/utils';

@Role()
@Controller('person/:personId/address')
export class PersonAddressController {
  constructor(private readonly addressService: PersonAddressService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreateDTO
  ) {
    return this.addressService.create(personId, data);
  }

  @Get()
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) addressId?: number
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
    @Param('personId', ParseIntPipe) personId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() data: UpdateDTO
  ) {
    return this.addressService.update(personId, addressId, data);
  }

  @Delete()
  delete(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.addressService.delete(personId, { ids });
  }
}
