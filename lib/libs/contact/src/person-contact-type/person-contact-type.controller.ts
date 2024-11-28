import { Pagination } from '@hedhog/pagination';
import { Locale } from '@hedhog/locale';
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
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { PersonContactTypeService } from './person-contact-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person-contact-type')
export class PersonContactTypeController {
  constructor(
    @Inject(forwardRef(() => PersonContactTypeService))
    private readonly personContactTypeService: PersonContactTypeService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.personContactTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.personContactTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personContactTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personContactTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personContactTypeService.delete(data);
  }
}
