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
import { MenuService } from './menu.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('menu')
export class MenuController {
  constructor(
    @Inject(forwardRef(() => MenuService))
    private readonly menuService: MenuService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.menuService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.menuService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.menuService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.menuService.delete(data);
  }
}
