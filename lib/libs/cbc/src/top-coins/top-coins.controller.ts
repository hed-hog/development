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
import { TopCoinsService } from './top-coins.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('top-coins')
export class TopCoinsController {
  constructor(
    @Inject(forwardRef(() => TopCoinsService))
    private readonly topCoinsService: TopCoinsService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.topCoinsService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.topCoinsService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.topCoinsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.topCoinsService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.topCoinsService.delete(data);
  }
}
