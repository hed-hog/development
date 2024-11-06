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
import { PersonDocumentTypeService } from './person-document-type.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Role()
@Controller('document-type')
export class PersonDocumentTypeController {
  constructor(
    private readonly documentTypeService: PersonDocumentTypeService,
  ) {}

  @Post()
  create(@Body() data: CreateDTO) {
    return this.documentTypeService.create(data);
  }

  @Get()
  list(@Pagination() paginationParams, @Locale() locale) {
    return this.documentTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.documentTypeService.get(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.documentTypeService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.documentTypeService.delete(data);
  }
}
