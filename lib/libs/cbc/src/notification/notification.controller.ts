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
import { NotificationService } from './notification.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.notificationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.notificationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.notificationService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.notificationService.delete(data);
  }
}
