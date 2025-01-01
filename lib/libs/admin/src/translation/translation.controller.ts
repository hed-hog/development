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
import { TranslationService } from './translation.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('translation')
export class TranslationController {
  constructor(
    @Inject(forwardRef(() => TranslationService))
    private readonly translationService: TranslationService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.translationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.translationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.translationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.translationService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.translationService.delete(data);
  }
}
