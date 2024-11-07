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
import { PersonAddressService } from "./person-address.service";
import { Role, DeleteDTO } from "@hedhog/utils";

@Role()
@Controller("person-address")
export class PersonAddressController {
  constructor(
    @Inject(forwardRef(() => PersonAddressService))
    private readonly personAddressService: PersonAddressService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.personAddressService.list(paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.personAddressService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personAddressService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personAddressService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personAddressService.delete(data);
  }
}
