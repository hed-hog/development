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
import { StockExchangeService } from './stock-exchange.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('stock-exchange')
export class StockExchangeController {
  constructor(
    @Inject(forwardRef(() => StockExchangeService))
    private readonly stockExchangeService: StockExchangeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.stockExchangeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.stockExchangeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.stockExchangeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.stockExchangeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.stockExchangeService.delete(data);
  }
}
