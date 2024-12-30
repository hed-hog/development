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
import { FreeBalanceConditionService } from './free-balance-condition.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('free-balance-condition')
export class FreeBalanceConditionController {
  constructor(
    @Inject(forwardRef(() => FreeBalanceConditionService))
    private readonly freeBalanceConditionService: FreeBalanceConditionService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.freeBalanceConditionService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.freeBalanceConditionService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.freeBalanceConditionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.freeBalanceConditionService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.freeBalanceConditionService.delete(data);
  }
}
