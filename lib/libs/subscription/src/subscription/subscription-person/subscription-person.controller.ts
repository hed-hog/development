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
import { SubscriptionPersonService } from './subscription-person.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('subscription/:subscriptionId/subscription-person')
export class SubscriptionPersonController {
  constructor(
    @Inject(forwardRef(() => SubscriptionPersonService))
    private readonly subscriptionPersonService: SubscriptionPersonService
  ) {}

  @Post()
  create(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Body() data: CreateDTO
  ) {
    return this.subscriptionPersonService.create(subscriptionId, data);
  }

  @Get()
  list(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Pagination() paginationParams
  ) {
    return this.subscriptionPersonService.list(
      paginationParams,
      subscriptionId
    );
  }

  @Get(':id')
  get(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.subscriptionPersonService.get(subscriptionId, id);
  }

  @Patch(':id')
  update(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.subscriptionPersonService.update(subscriptionId, id, data);
  }

  @Delete()
  delete(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.subscriptionPersonService.delete(subscriptionId, { ids });
  }
}
