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
import { SubscriptionPlanItemService } from './subscription-plan-item.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('subscription-plan-item')
export class SubscriptionPlanItemController {
  constructor(
    @Inject(forwardRef(() => SubscriptionPlanItemService))
    private readonly subscriptionPlanItemService: SubscriptionPlanItemService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.subscriptionPlanItemService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionPlanItemService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.subscriptionPlanItemService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.subscriptionPlanItemService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.subscriptionPlanItemService.delete(data);
  }
}
