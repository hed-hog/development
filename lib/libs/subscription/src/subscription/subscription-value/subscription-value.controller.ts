import { Pagination } from '@hedhog/pagination';
import { Role } from '@hedhog/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Inject,
  forwardRef
} from '@nestjs/common';
import { SubscriptionValueService } from './subscription-value.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('subscription/:subscriptionId/subscription-value')
export class SubscriptionValueController {
  constructor(
    @Inject(forwardRef(() => SubscriptionValueService))
    private readonly subscriptionValueService: SubscriptionValueService
  ) {}

  @Post()
  create(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Body() data: CreateDTO
  ) {
    return this.subscriptionValueService.create(subscriptionId, data);
  }

  @Get()
  list(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Pagination() paginationParams
  ) {
    return this.subscriptionValueService.list(paginationParams, subscriptionId);
  }

  @Get(':id')
  get(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.subscriptionValueService.get(subscriptionId, id);
  }

  @Patch(':id')
  update(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.subscriptionValueService.update(subscriptionId, id, data);
  }

  @Delete()
  delete(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.subscriptionValueService.delete(subscriptionId, { ids });
  }
}
