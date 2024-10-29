import { Role } from '@hedhog/admin';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OptionalParseIntPipe } from '../pipes/optional-parse-int.pipe';
import { DocumentService } from './document.service';
import { CreatePersonDocumentDTO } from './dto/create-document.dto';
import { UpdatePersonDocumentDTO } from './dto/update-document.dto';

@Role()
@Controller('persons/:personId/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreatePersonDocumentDTO,
  ) {
    return this.documentService.create(personId, data);
  }

  @Get()
  getDocuments(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) documentId?: number,
  ) {
    if (documentId) {
      return this.documentService.getDocumentById(documentId);
    }
    if (typeId) {
      return this.documentService.getDocumentByTypeId(personId, typeId);
    }
    return this.documentService.getDocuments(personId);
  }

  @Patch(':documentId')
  update(
    @Param('documentId', ParseIntPipe) id: number,
    @Body() data: UpdatePersonDocumentDTO,
  ) {
    return this.documentService.update(id, data);
  }

  @Delete(':documentId')
  remove(@Param('documentId', ParseIntPipe) documentId: number) {
    return this.documentService.remove(documentId);
  }
}
