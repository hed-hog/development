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
import { SubscriptionPlanService } from './subscription-plan.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('subscription-plan')
export class SubscriptionPlanController {
  constructor(
    @Inject(forwardRef(() => SubscriptionPlanService))
    private readonly subscriptionPlanService: SubscriptionPlanService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.subscriptionPlanService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionPlanService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.subscriptionPlanService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.subscriptionPlanService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.subscriptionPlanService.delete(data);
  }
}
