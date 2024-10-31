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
import { PaymentGatewayService } from './payment-gateway.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(
    @Inject(forwardRef(() => PaymentGatewayService))
    private readonly paymentGatewayService: PaymentGatewayService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale) {
    return this.paymentGatewayService.get(locale, paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGatewayService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.paymentGatewayService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentGatewayService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentGatewayService.delete(data);
  }
}
