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
import { TopCoinTypeService } from './top-coin-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('top-coin-type')
export class TopCoinTypeController {
  constructor(
    @Inject(forwardRef(() => TopCoinTypeService))
    private readonly topCoinTypeService: TopCoinTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.topCoinTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.topCoinTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.topCoinTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.topCoinTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.topCoinTypeService.delete(data);
  }
}
