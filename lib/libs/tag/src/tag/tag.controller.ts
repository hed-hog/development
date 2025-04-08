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
import { TagService } from './tag.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('tag')
export class TagController {
  constructor(
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.tagService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.tagService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.tagService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.tagService.delete(data);
  }
}
