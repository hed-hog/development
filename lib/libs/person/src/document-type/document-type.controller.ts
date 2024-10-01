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
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDTO } from './dto/create-document-type.dto';
import { Pagination } from '@hedhog/pagination';
import { UpdateDocumentTypeDTO } from './dto/update-document-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Controller('document-types')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  create(@Body() data: CreateDocumentTypeDTO) {
    return this.documentTypeService.create(data);
  }

  @Get()
  getdocumentTypes(@Pagination() paginationParams) {
    return this.documentTypeService.getDocumentTypes(paginationParams);
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
