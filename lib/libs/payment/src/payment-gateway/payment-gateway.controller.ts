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
import { PaymentGatewayService } from './payment-gateway.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(
    @Inject(forwardRef(() => PaymentGatewayService))
    private readonly paymentGatewayService: PaymentGatewayService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentGatewayService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGatewayService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentGatewayService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentGatewayService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentGatewayService.delete(data);
  }
}
