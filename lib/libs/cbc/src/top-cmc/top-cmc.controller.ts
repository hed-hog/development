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
import { TopCmcService } from './top-cmc.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('top-cmc')
export class TopCmcController {
  constructor(
    @Inject(forwardRef(() => TopCmcService))
    private readonly topCmcService: TopCmcService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.topCmcService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.topCmcService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.topCmcService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.topCmcService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.topCmcService.delete(data);
  }
}
