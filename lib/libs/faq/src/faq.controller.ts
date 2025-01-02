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
import { FaqService } from './faq.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('faq')
export class FaqController {
  constructor(
    @Inject(forwardRef(() => FaqService))
    private readonly faqService: FaqService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.faqService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.faqService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.faqService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.faqService.delete(data);
  }
}
