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
import { AltcoinSeasonService } from './altcoin-season.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('altcoin-season')
export class AltcoinSeasonController {
  constructor(
    @Inject(forwardRef(() => AltcoinSeasonService))
    private readonly altcoinSeasonService: AltcoinSeasonService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.altcoinSeasonService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.altcoinSeasonService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.altcoinSeasonService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.altcoinSeasonService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.altcoinSeasonService.delete(data);
  }
}
