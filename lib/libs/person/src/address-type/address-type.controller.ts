import { Locale, Role } from '@hedhog/admin';
import { Pagination } from '@hedhog/pagination';
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
import { DeleteDTO } from '../dto/delete.dto';
import { AddressTypeService } from './address-type.service';
import { CreateAddressTypeDTO } from './dto/create-address-type.dto';
import { UpdateAddressTypeDTO } from './dto/update-address-type.dto';

@Role()
@Controller('address-type')
export class AddressTypeController {
  constructor(private readonly addressTypeService: AddressTypeService) {}

  @Post()
  create(@Body() data: CreateAddressTypeDTO) {
    return this.addressTypeService.create(data);
  }

  @Get()
  list(@Pagination() paginationParams, @Locale() locale) {
    return this.addressTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.addressTypeService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAddressTypeDTO,
  ) {
    return this.addressTypeService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.addressTypeService.delete(data);
  }
}
