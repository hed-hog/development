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
import { TrendTypeService } from './trend-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('trend-type')
export class TrendTypeController {
  constructor(
    @Inject(forwardRef(() => TrendTypeService))
    private readonly trendTypeService: TrendTypeService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.trendTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.trendTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.trendTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.trendTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.trendTypeService.delete(data);
  }
}
