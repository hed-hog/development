import { Pagination } from '@hedhog/pagination';
import { Locale } from '@hedhog/locale';
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
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { ContactUsService } from './contact-us.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('contact-us')
export class ContactUsController {
  constructor(
    @Inject(forwardRef(() => ContactUsService))
    private readonly contactUsService: ContactUsService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.contactUsService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.contactUsService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.contactUsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.contactUsService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.contactUsService.delete(data);
  }
}
