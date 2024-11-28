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
import { PersonDocumentTypeService } from './person-document-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person-document-type')
export class PersonDocumentTypeController {
  constructor(
    @Inject(forwardRef(() => PersonDocumentTypeService))
    private readonly personDocumentTypeService: PersonDocumentTypeService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.personDocumentTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.personDocumentTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personDocumentTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personDocumentTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personDocumentTypeService.delete(data);
  }
}
