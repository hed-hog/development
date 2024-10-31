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
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDTO } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDTO } from './dto/update-document-type.dto';

@Role()
@Controller('document-types')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  create(@Body() data: CreateDocumentTypeDTO) {
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDocumentTypeDTO,
  ) {
    return this.documentTypeService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.documentTypeService.delete(data);
  }
}
