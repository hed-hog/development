import { Role } from '@hedhog/utils';
import { Locale } from '@hedhog/locale';
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
import { DeleteDTO } from './dto/delete.dto';
import { PersonAddressTypeService } from './person-address-type.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Role()
@Controller('address-type')
export class PersonAddressTypeController {
  constructor(private readonly addressTypeService: PersonAddressTypeService) {}

  @Post()
  create(@Body() data: CreateDTO) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.addressTypeService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.addressTypeService.delete(data);
  }
}
