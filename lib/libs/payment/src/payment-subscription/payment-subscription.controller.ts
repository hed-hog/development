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
import { PaymentSubscriptionService } from './payment-subscription.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('payment-subscription')
export class PaymentSubscriptionController {
  constructor(
    @Inject(forwardRef(() => PaymentSubscriptionService))
    private readonly paymentSubscriptionService: PaymentSubscriptionService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams) {
    return this.paymentSubscriptionService.get(paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentSubscriptionService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.paymentSubscriptionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentSubscriptionService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentSubscriptionService.delete(data);
  }
}
