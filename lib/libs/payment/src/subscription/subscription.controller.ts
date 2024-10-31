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
import { SubscriptionService } from './subscription.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('subscription')
export class SubscriptionController {
  constructor(
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams) {
    return this.subscriptionService.get(paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
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
