import { Locale } from "@hedhog/admin";
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
import { ContactusSubjectService } from "./contactus-subject.service";
import { Role } from "@hedhog/admin";

@Role()
@Controller("contactus-subject")
export class ContactusSubjectController {
  constructor(
    @Inject(forwardRef(() => ContactusSubjectService))
    private readonly contactusSubjectService: ContactusSubjectService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.contactusSubjectService.list(locale, paginationParams);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return this.contactusSubjectService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.contactusSubjectService.create(data);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.contactusSubjectService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.contactusSubjectService.delete(data);
  }
}
