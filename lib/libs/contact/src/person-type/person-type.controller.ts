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
import { UpdateDTO } from './dto/update.dto';
import { PersonTypeService } from './person-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person-type')
export class PersonTypeController {
  constructor(
    @Inject(forwardRef(() => PersonTypeService))
    private readonly personTypeService: PersonTypeService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.personTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.personTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personTypeService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personTypeService.delete(data);
  }
}
