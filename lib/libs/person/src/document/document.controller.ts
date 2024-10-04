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
import { DocumentService } from './document.service';
import { UpdatePersonDocumentDTO } from './dto/update-document.dto';
import { CreatePersonDocumentDTO } from './dto/create-document.dto';
import { OptionalParseIntPipe } from '../pipes/optional-parse-int.pipe';

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