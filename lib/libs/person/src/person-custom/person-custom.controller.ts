import { Locale } from "@hedhog/locale";
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
import { PersonCustomService } from "./person-custom.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("person-custom")
export class PersonCustomController {
  constructor(
    @Inject(forwardRef(() => PersonCustomService))
    private readonly personCustomService: PersonCustomService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.personCustomService.list(locale, paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.personCustomService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personCustomService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personCustomService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personCustomService.delete(data);
  }
}
