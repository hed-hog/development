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
import { MmrService } from './mmr.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('mmr')
export class MmrController {
  constructor(
    @Inject(forwardRef(() => MmrService))
    private readonly mmrService: MmrService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.mmrService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.mmrService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.mmrService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.mmrService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.mmrService.delete(data);
  }
}
