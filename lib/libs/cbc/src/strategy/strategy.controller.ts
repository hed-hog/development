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
import { StrategyService } from './strategy.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('strategy')
export class StrategyController {
  constructor(
    @Inject(forwardRef(() => StrategyService))
    private readonly strategyService: StrategyService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.strategyService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.strategyService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.strategyService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.strategyService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.strategyService.delete(data);
  }
}
