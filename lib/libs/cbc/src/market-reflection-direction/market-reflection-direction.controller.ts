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
import { MarketReflectionDirectionService } from './market-reflection-direction.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('market-reflection-direction')
export class MarketReflectionDirectionController {
  constructor(
    @Inject(forwardRef(() => MarketReflectionDirectionService))
    private readonly marketReflectionDirectionService: MarketReflectionDirectionService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.marketReflectionDirectionService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.marketReflectionDirectionService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.marketReflectionDirectionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.marketReflectionDirectionService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.marketReflectionDirectionService.delete(data);
  }
}
