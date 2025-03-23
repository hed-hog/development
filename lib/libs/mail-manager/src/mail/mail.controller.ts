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
import { MailService } from './mail.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('mail')
export class MailController {
  constructor(
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.mailService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.mailService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.mailService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.mailService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.mailService.delete(data);
  }
}
