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
import { InstanceService } from './instance.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('instance')
export class InstanceController {
  constructor(
    @Inject(forwardRef(() => InstanceService))
    private readonly instanceService: InstanceService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.instanceService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.instanceService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.instanceService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.instanceService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.instanceService.delete(data);
  }
}
