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
import { ContactusService } from "./contactus.service";
import { Role } from "@hedhog/admin";

@Role()
@Controller("contactus")
export class ContactusController {
  constructor(
    @Inject(forwardRef(() => ContactusService))
    private readonly contactusService: ContactusService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.contactusService.list(paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.contactusService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.contactusService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.contactusService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.contactusService.delete(data);
  }
}
