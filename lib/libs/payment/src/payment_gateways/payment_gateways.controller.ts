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
import { Payment_gatewaysService } from './payment_gateways.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('payment_gateways')
export class Payment_gatewaysController {
  constructor(
    @Inject(forwardRef(() => Payment_gatewaysService))
    private readonly payment_gatewaysService: Payment_gatewaysService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams) {
    return this.payment_gatewaysService.get(paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.payment_gatewaysService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.payment_gatewaysService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.payment_gatewaysService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.payment_gatewaysService.delete(data);
  }
}
