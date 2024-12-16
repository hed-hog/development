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
import { TradeSignalTypeService } from './trade-signal-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('trade-signal-type')
export class TradeSignalTypeController {
  constructor(
    @Inject(forwardRef(() => TradeSignalTypeService))
    private readonly tradeSignalTypeService: TradeSignalTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.tradeSignalTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.tradeSignalTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.tradeSignalTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.tradeSignalTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.tradeSignalTypeService.delete(data);
  }
}
