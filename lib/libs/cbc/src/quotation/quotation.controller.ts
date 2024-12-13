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
import { QuotationService } from './quotation.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('quotation')
export class QuotationController {
  constructor(
    @Inject(forwardRef(() => QuotationService))
    private readonly quotationService: QuotationService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.quotationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.quotationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.quotationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.quotationService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.quotationService.delete(data);
  }
}
