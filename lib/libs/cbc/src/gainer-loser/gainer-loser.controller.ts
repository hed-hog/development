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
import { GainerLoserService } from './gainer-loser.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('gainer-loser')
export class GainerLoserController {
  constructor(
    @Inject(forwardRef(() => GainerLoserService))
    private readonly gainerLoserService: GainerLoserService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.gainerLoserService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.gainerLoserService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.gainerLoserService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.gainerLoserService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.gainerLoserService.delete(data);
  }
}
