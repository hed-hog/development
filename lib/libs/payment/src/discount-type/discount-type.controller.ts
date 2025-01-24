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
import { DiscountTypeService } from './discount-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('discount-type')
export class DiscountTypeController {
  constructor(
    @Inject(forwardRef(() => DiscountTypeService))
    private readonly discountTypeService: DiscountTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.discountTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.discountTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.discountTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.discountTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.discountTypeService.delete(data);
  }
}
