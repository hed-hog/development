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
import { QuotesService } from './quotes.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('quotes')
export class QuotesController {
  constructor(
    @Inject(forwardRef(() => QuotesService))
    private readonly quotesService: QuotesService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.quotesService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.quotesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.quotesService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.quotesService.delete(data);
  }
}
