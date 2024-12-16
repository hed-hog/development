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
import { BankingService } from './banking.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('banking')
export class BankingController {
  constructor(
    @Inject(forwardRef(() => BankingService))
    private readonly bankingService: BankingService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.bankingService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.bankingService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.bankingService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.bankingService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.bankingService.delete(data);
  }
}
