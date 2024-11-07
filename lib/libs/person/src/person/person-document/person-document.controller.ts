import { Role, OptionalParseIntPipe } from "@hedhog/utils";
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
} from "@nestjs/common";
import { PersonDocumentService } from "./person-document.service";
import { CreateDTO } from "./dto/create.dto";
import { UpdateDTO } from "./dto/update.dto";

@Role()
@Controller("person/:personId/document")
export class PersonDocumentController {
  constructor(private readonly documentService: PersonDocumentService) {}
  @Post()
  create(
    @Param("personId", ParseIntPipe) personId: number,
    @Body() data: CreateDTO,
  ) {
    return this.documentService.create(personId, data);
  }

  @Get()
  list(
    @Param("personId", ParseIntPipe) personId: number,
    @Query("typeId", OptionalParseIntPipe) typeId?: number,
    @Query("id", OptionalParseIntPipe) documentId?: number,
  ) {
    if (documentId) {
      return this.documentService.list(personId, null, documentId);
    }
    if (typeId) {
      return this.documentService.list(personId, typeId);
    }
    return this.documentService.list(personId);
  }

  @Patch(":documentId")
  update(
    @Param("documentId", ParseIntPipe) id: number,
    @Body() data: UpdateDTO,
  ) {
    return this.documentService.update(id, data);
  }

  @Delete(":documentId")
  delete(@Param("documentId", ParseIntPipe) documentId: number) {
    return this.documentService.delete(documentId);
  }
}
