import { Locale } from '@hedhog/admin';
import { Pagination } from '@hedhog/pagination';
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
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { SubscriptionStatusService } from './subscription-status.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('subscription-status')
export class SubscriptionStatusController {
  constructor(
    @Inject(forwardRef(() => SubscriptionStatusService))
    private readonly subscriptionStatusService: SubscriptionStatusService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale) {
    return this.subscriptionStatusService.get(locale, paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionStatusService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.subscriptionStatusService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.subscriptionStatusService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.subscriptionStatusService.delete(data);
  }
}
