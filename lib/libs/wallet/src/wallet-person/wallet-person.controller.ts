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
import { WalletPersonService } from './wallet-person.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('wallet-person')
export class WalletPersonController {
  constructor(
    @Inject(forwardRef(() => WalletPersonService))
    private readonly walletPersonService: WalletPersonService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.walletPersonService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.walletPersonService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.walletPersonService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.walletPersonService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.walletPersonService.delete(data);
  }
}
