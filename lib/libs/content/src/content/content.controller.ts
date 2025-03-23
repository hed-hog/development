import { DeleteDTO, Role } from '@hedhog/core';
import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
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
  forwardRef,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Role()
@Controller('content')
export class ContentController {
  constructor(
    @Inject(forwardRef(() => ContentService))
    private readonly contentService: ContentService,
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.contentService.list(locale, paginationParams);
  }

  @Get('slug/:slug')
  async slug(@Param('slug') slug: string) {
    console.log('slug', slug);
    return this.contentService.getBySlug(slug);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    console.log('id', id);
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
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.contentService.delete(data);
  }
}
