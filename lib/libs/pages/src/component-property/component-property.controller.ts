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
import { ComponentPropertyService } from "./component-property.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("component-property")
export class ComponentPropertyController {
  constructor(
    @Inject(forwardRef(() => ComponentPropertyService))
    private readonly componentPropertyService: ComponentPropertyService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.componentPropertyService.list(locale, paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.componentPropertyService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentPropertyService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentPropertyService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentPropertyService.delete(data);
  }
}
