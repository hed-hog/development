import { Role, OptionalParseIntPipe } from '@hedhog/core';
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
import { PersonDocumentService } from './person-document.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person/:personId/document')
export class PersonDocumentController {
  constructor(private readonly documentService: PersonDocumentService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreateDTO,
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
    @Param('personId', ParseIntPipe) personId: number,
    @Param('documentId', ParseIntPipe) documentId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.documentService.update(personId, documentId, data);
  }

  @Delete()
  delete(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() { ids }: DeleteDTO,
  ) {
    return this.documentService.delete(personId, { ids });
  }
}
