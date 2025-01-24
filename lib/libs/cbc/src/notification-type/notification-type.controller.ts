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
import { NotificationTypeService } from './notification-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('notification-type')
export class NotificationTypeController {
  constructor(
    @Inject(forwardRef(() => NotificationTypeService))
    private readonly notificationTypeService: NotificationTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.notificationTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.notificationTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.notificationTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.notificationTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.notificationTypeService.delete(data);
  }
}
