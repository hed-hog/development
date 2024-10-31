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
import { Subscription_statusesService } from './subscription_statuses.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('subscription_statuses')
export class Subscription_statusesController {
  constructor(
    @Inject(forwardRef(() => Subscription_statusesService))
    private readonly subscription_statusesService: Subscription_statusesService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale) {
    return this.subscription_statusesService.get(paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.subscription_statusesService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.subscription_statusesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.subscription_statusesService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.subscription_statusesService.delete(data);
  }
}
