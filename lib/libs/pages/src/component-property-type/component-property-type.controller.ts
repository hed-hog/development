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
import { ComponentPropertyTypeService } from "./component-property-type.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("component-property-type")
export class ComponentPropertyTypeController {
  constructor(
    @Inject(forwardRef(() => ComponentPropertyTypeService))
    private readonly componentPropertyTypeService: ComponentPropertyTypeService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.componentPropertyTypeService.list(locale, paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.componentPropertyTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentPropertyTypeService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentPropertyTypeService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentPropertyTypeService.delete(data);
  }
}
