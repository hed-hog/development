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
@Controller('person/:personId/documents')
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
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) documentId?: number,
  ) {
    if (documentId) {
      return this.documentService.list(personId, null, documentId);
    }
    if (typeId) {
      return this.documentService.list(personId, typeId);
    }
    return this.documentService.list(personId);
  }

  @Patch(':documentId')
  update(
    @Param('documentId', ParseIntPipe) id: number,
    @Body() data: UpdatePersonDocumentDTO,
  ) {
    return this.documentService.update(id, data);
  }

  @Delete(':documentId')
  delete(@Param('documentId', ParseIntPipe) documentId: number) {
    return this.documentService.delete(documentId);
  }
}
