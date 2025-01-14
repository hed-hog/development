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
import { CoinVariationTypeService } from './coin-variation-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('coin-variation-type')
export class CoinVariationTypeController {
  constructor(
    @Inject(forwardRef(() => CoinVariationTypeService))
    private readonly coinVariationTypeService: CoinVariationTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.coinVariationTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.coinVariationTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.coinVariationTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.coinVariationTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.coinVariationTypeService.delete(data);
  }
}
