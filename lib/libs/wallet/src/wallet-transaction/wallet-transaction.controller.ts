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
import { WalletTransactionService } from './wallet-transaction.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('wallet-transaction')
export class WalletTransactionController {
  constructor(
    @Inject(forwardRef(() => WalletTransactionService))
    private readonly walletTransactionService: WalletTransactionService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.walletTransactionService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.walletTransactionService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.walletTransactionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.walletTransactionService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.walletTransactionService.delete(data);
  }
}
