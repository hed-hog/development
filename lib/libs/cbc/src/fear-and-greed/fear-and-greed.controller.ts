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
import { FearAndGreedService } from './fear-and-greed.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('fear-and-greed')
export class FearAndGreedController {
  constructor(
    @Inject(forwardRef(() => FearAndGreedService))
    private readonly fearAndGreedService: FearAndGreedService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.fearAndGreedService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.fearAndGreedService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.fearAndGreedService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.fearAndGreedService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.fearAndGreedService.delete(data);
  }
}
