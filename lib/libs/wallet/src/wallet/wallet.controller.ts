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
import { WalletService } from './wallet.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('wallet')
export class WalletController {
  constructor(
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.walletService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.walletService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.walletService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.walletService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.walletService.delete(data);
  }
}
