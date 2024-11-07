import { Pagination } from "@hedhog/pagination";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  forwardRef,
} from "@nestjs/common";
import { CreateDTO } from "./dto/create.dto";
import { UpdateDTO } from "./dto/update.dto";
import { PersonDocumentService } from "./person-document.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("person-document")
export class PersonDocumentController {
  constructor(
    @Inject(forwardRef(() => PersonDocumentService))
    private readonly personDocumentService: PersonDocumentService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.personDocumentService.list(paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.personDocumentService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personDocumentService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personDocumentService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personDocumentService.delete(data);
  }
}
