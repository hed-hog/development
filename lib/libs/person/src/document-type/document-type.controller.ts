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
  getdocumentTypes(@Pagination() paginationParams, @Locale() locale) {
    return this.documentTypeService.getDocumentTypes(locale, paginationParams);
  }

  @Get(':id')
  getdocumentTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.documentTypeService.getDocumentTypeById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDocumentTypeDTO,
  ) {
    return this.documentTypeService.update(id, data);
  }

  @Delete()
  remove(@Body() data: DeleteDTO) {
    return this.documentTypeService.remove(data);
  }
}
