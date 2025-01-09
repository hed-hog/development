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
import { GatewayService } from './gateway.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('gateway')
export class GatewayController {
  constructor(
    @Inject(forwardRef(() => GatewayService))
    private readonly gatewayService: GatewayService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.gatewayService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.gatewayService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.gatewayService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.gatewayService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.gatewayService.delete(data);
  }
}
