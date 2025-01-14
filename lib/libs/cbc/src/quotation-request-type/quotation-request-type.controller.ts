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
import { QuotationRequestTypeService } from './quotation-request-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('quotation-request-type')
export class QuotationRequestTypeController {
  constructor(
    @Inject(forwardRef(() => QuotationRequestTypeService))
    private readonly quotationRequestTypeService: QuotationRequestTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.quotationRequestTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.quotationRequestTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.quotationRequestTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.quotationRequestTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.quotationRequestTypeService.delete(data);
  }
}
