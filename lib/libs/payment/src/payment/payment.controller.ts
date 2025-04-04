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
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { PaymentService } from './payment.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentService.list(paginationParams, false);
  }

  @Get('active')
  async listActive(@Pagination() paginationParams) {
    return this.paymentService.list(paginationParams, true);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentService.delete(data);
  }
}
