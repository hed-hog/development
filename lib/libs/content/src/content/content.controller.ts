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
import { ContentService } from './content.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('content')
export class ContentController {
  constructor(
    @Inject(forwardRef(() => ContentService))
    private readonly contentService: ContentService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.contentService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.contentService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.contentService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.contentService.delete(data);
  }
}
