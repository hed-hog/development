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
import { PageService } from "./page.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("page")
export class PageController {
  constructor(
    @Inject(forwardRef(() => PageService))
    private readonly pageService: PageService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.pageService.list(locale, paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.pageService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.pageService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.pageService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.pageService.delete(data);
  }
}
