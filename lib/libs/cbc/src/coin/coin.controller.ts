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
import { CoinService } from './coin.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('coin')
export class CoinController {
  constructor(
    @Inject(forwardRef(() => CoinService))
    private readonly coinService: CoinService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.coinService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.coinService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.coinService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.coinService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.coinService.delete(data);
  }
}
