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
import { PaymentStatusService } from './payment-status.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-status')
export class PaymentStatusController {
  constructor(
    @Inject(forwardRef(() => PaymentStatusService))
    private readonly paymentStatusService: PaymentStatusService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.paymentStatusService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentStatusService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentStatusService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentStatusService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentStatusService.delete(data);
  }
}
