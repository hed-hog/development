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
import { MailSentService } from './mail-sent.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('mail-sent')
export class MailSentController {
  constructor(
    @Inject(forwardRef(() => MailSentService))
    private readonly mailSentService: MailSentService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.mailSentService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.mailSentService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.mailSentService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.mailSentService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.mailSentService.delete(data);
  }
}
