import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { PersonAddressTypeService } from './person-address-type.service';
import { Role } from '@hedhog/utils';

@Role()
@Controller('address-type')
export class PersonAddressTypeController {
  constructor(
    @Inject(forwardRef(() => PersonAddressTypeService))
    private readonly personAddressTypeService: PersonAddressTypeService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.personAddressTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.personAddressTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personAddressTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personAddressTypeService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personAddressTypeService.delete(data);
  }
}
