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
import { ComponentInstancePropertyService } from "./component-instance-property.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("component-instance-property")
export class ComponentInstancePropertyController {
  constructor(
    @Inject(forwardRef(() => ComponentInstancePropertyService))
    private readonly componentInstancePropertyService: ComponentInstancePropertyService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.componentInstancePropertyService.list(paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.componentInstancePropertyService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentInstancePropertyService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentInstancePropertyService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentInstancePropertyService.delete(data);
  }
}
