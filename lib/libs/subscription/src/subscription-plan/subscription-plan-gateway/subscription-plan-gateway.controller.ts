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
import { SubscriptionPlanGatewayService } from './subscription-plan-gateway.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('subscription-plan/:planId/subscription-plan-gateway')
export class SubscriptionPlanGatewayController {
  constructor(
    @Inject(forwardRef(() => SubscriptionPlanGatewayService))
    private readonly subscriptionPlanGatewayService: SubscriptionPlanGatewayService
  ) {}

  @Post()
  create(
    @Param('planId', ParseIntPipe) planId: number,
    @Body() data: CreateDTO
  ) {
    return this.subscriptionPlanGatewayService.create(planId, data);
  }

  @Get()
  list(
    @Param('planId', ParseIntPipe) planId: number,
    @Pagination() paginationParams
  ) {
    return this.subscriptionPlanGatewayService.list(paginationParams, planId);
  }

  @Get(':id')
  get(
    @Param('planId', ParseIntPipe) planId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.subscriptionPlanGatewayService.get(planId, id);
  }

  @Patch(':id')
  update(
    @Param('planId', ParseIntPipe) planId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.subscriptionPlanGatewayService.update(planId, id, data);
  }

  @Delete()
  delete(
    @Param('planId', ParseIntPipe) planId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.subscriptionPlanGatewayService.delete(planId, { ids });
  }
}
