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
import { OperationService } from './operation.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('operation')
export class OperationController {
  constructor(
    @Inject(forwardRef(() => OperationService))
    private readonly operationService: OperationService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.operationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.operationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.operationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.operationService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.operationService.delete(data);
  }
}
