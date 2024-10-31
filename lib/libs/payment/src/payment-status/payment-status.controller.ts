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
import { PaymentStatusService } from './payment-status.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('payment-status')
export class PaymentStatusController {
  constructor(
    @Inject(forwardRef(() => PaymentStatusService))
    private readonly paymentStatusService: PaymentStatusService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale) {
    return this.paymentStatusService.get(locale, paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentStatusService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.paymentStatusService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentStatusService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentStatusService.delete(data);
  }
}
