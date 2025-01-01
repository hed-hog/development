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
import { MultifactorService } from './multifactor.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('multifactor')
export class MultifactorController {
  constructor(
    @Inject(forwardRef(() => MultifactorService))
    private readonly multifactorService: MultifactorService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.multifactorService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.multifactorService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.multifactorService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.multifactorService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.multifactorService.delete(data);
  }
}
