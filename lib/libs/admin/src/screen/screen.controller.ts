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
import { ScreenService } from './screen.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('screen')
export class ScreenController {
  constructor(
    @Inject(forwardRef(() => ScreenService))
    private readonly screenService: ScreenService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.screenService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.screenService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.screenService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.screenService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.screenService.delete(data);
  }
}
