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
import { ComponentInstanceService } from "./component-instance.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("component-instance")
export class ComponentInstanceController {
  constructor(
    @Inject(forwardRef(() => ComponentInstanceService))
    private readonly componentInstanceService: ComponentInstanceService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.componentInstanceService.list(paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.componentInstanceService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentInstanceService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentInstanceService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentInstanceService.delete(data);
  }
}
