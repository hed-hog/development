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
import { QuoteService } from './quote.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('quote')
export class QuoteController {
  constructor(
    @Inject(forwardRef(() => QuoteService))
    private readonly quoteService: QuoteService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.quoteService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.quoteService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.quoteService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.quoteService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.quoteService.delete(data);
  }
}
