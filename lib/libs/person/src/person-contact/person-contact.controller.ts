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
import { DeleteDTO } from "./dto/delete.dto";
import { UpdateDTO } from "./dto/update.dto";
import { PersonContactService } from "./person-contact.service";
import { Role } from "@hedhog/utils";

@Role()
@Controller("person-contact")
export class PersonContactController {
  constructor(
    @Inject(forwardRef(() => PersonContactService))
    private readonly personContactService: PersonContactService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.personContactService.list(paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.personContactService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personContactService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personContactService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personContactService.delete(data);
  }
}
