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
import { GainersLoserService } from './gainers-loser.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('gainers-loser')
export class GainersLoserController {
  constructor(
    @Inject(forwardRef(() => GainersLoserService))
    private readonly gainersLoserService: GainersLoserService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.gainersLoserService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.gainersLoserService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.gainersLoserService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.gainersLoserService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.gainersLoserService.delete(data);
  }
}
