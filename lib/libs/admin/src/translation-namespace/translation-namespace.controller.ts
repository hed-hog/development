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
import { TranslationNamespaceService } from './translation-namespace.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('translation-namespace')
export class TranslationNamespaceController {
  constructor(
    @Inject(forwardRef(() => TranslationNamespaceService))
    private readonly translationNamespaceService: TranslationNamespaceService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.translationNamespaceService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.translationNamespaceService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.translationNamespaceService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.translationNamespaceService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.translationNamespaceService.delete(data);
  }
}
