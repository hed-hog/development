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
import { QuotationTypeService } from './quotation-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('quotation-type')
export class QuotationTypeController {
  constructor(
    @Inject(forwardRef(() => QuotationTypeService))
    private readonly quotationTypeService: QuotationTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.quotationTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.quotationTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.quotationTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.quotationTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.quotationTypeService.delete(data);
  }
}
