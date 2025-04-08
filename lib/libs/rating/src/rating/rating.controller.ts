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
import { RatingService } from './rating.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('rating')
export class RatingController {
  constructor(
    @Inject(forwardRef(() => RatingService))
    private readonly ratingService: RatingService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.ratingService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.ratingService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.ratingService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.ratingService.delete(data);
  }
}
