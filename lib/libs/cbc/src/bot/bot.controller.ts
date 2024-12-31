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
import { BotService } from './bot.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('bot')
export class BotController {
  constructor(
    @Inject(forwardRef(() => BotService))
    private readonly botService: BotService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.botService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.botService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.botService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.botService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.botService.delete(data);
  }
}
