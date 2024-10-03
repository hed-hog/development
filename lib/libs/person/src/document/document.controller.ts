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
import { DocumentService } from './document.service';
import { UpdatePersonDocumentDTO } from './dto/update-document.dto';
import { CreatePersonDocumentDTO } from './dto/create-document.dto';

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
  getDocuments(@Param('personId', ParseIntPipe) personId: number) {
    return this.documentService.getDocuments(personId);
  }

  @Get(':documentId')
  getDocumentById(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('documentId', ParseIntPipe) typeId: number,
  ) {
    return this.documentService.getDocumentById(personId, typeId);
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
