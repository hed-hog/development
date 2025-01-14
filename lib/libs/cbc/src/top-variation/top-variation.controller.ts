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
import { TopVariationService } from './top-variation.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('top-variation')
export class TopVariationController {
  constructor(
    @Inject(forwardRef(() => TopVariationService))
    private readonly topVariationService: TopVariationService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.topVariationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.topVariationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.topVariationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.topVariationService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.topVariationService.delete(data);
  }
}
