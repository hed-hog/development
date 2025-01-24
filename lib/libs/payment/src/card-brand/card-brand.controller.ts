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
import { CardBrandService } from './card-brand.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('card-brand')
export class CardBrandController {
  constructor(
    @Inject(forwardRef(() => CardBrandService))
    private readonly cardBrandService: CardBrandService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.cardBrandService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.cardBrandService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.cardBrandService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.cardBrandService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.cardBrandService.delete(data);
  }
}
