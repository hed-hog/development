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
import { MailVarService } from './mail-var.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('mail-var')
export class MailVarController {
  constructor(
    @Inject(forwardRef(() => MailVarService))
    private readonly mailVarService: MailVarService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.mailVarService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.mailVarService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.mailVarService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.mailVarService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.mailVarService.delete(data);
  }
}
