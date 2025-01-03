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
import { GainersLosersService } from './gainers-losers.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('gainers-losers')
export class GainersLosersController {
  constructor(
    @Inject(forwardRef(() => GainersLosersService))
    private readonly gainersLosersService: GainersLosersService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.gainersLosersService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.gainersLosersService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.gainersLosersService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.gainersLosersService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.gainersLosersService.delete(data);
  }
}
