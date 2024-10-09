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
import { AddressTypeService } from './address-type.service';
import { CreateAddressTypeDTO } from './dto/create-address-type.dto';
import { Pagination } from '@hedhog/pagination';
import { UpdateAddressTypeDTO } from './dto/update-address-type.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { Locale } from '@hedhog/locale';

@Controller('address-types')
export class AddressTypeController {
  constructor(private readonly addressTypeService: AddressTypeService) {}

  @Post()
  create(@Body() data: CreateAddressTypeDTO) {
    return this.addressTypeService.create(data);
  }

  @Get()
  getAddressTypes(@Pagination() paginationParams, @Locale() locale) {
    return this.addressTypeService.getAddressTypes(locale, paginationParams);
  }

  @Get(':id')
  getAddressTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.addressTypeService.getAddressTypeById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAddressTypeDTO,
  ) {
    return this.addressTypeService.update(id, data);
  }

  @Delete()
  remove(@Body() data: DeleteDTO) {
    return this.addressTypeService.remove(data);
  }
}
