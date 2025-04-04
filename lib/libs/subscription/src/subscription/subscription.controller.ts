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
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { SubscriptionService } from './subscription.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('subscription')
export class SubscriptionController {
  constructor(
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.subscriptionService.list(paginationParams, false);
  }

  @Get('active')
  async listActive(@Pagination() paginationParams) {
    return this.subscriptionService.list(paginationParams, true);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.subscriptionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.subscriptionService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.subscriptionService.delete(data);
  }
}
