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
import { SubscriptionsService } from './subscriptions.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    @Inject(forwardRef(() => SubscriptionsService))
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams) {
    return this.subscriptionsService.get(paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.subscriptionsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.subscriptionsService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.subscriptionsService.delete(data);
  }
}
