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
import { ItemService } from './item.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('item')
export class ItemController {
  constructor(
    @Inject(forwardRef(() => ItemService))
    private readonly itemService: ItemService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.itemService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.itemService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.itemService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.itemService.delete(data);
  }
}
