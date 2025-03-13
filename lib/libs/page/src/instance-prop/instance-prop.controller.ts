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
import { InstancePropService } from './instance-prop.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('instance-prop')
export class InstancePropController {
  constructor(
    @Inject(forwardRef(() => InstancePropService))
    private readonly instancePropService: InstancePropService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.instancePropService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.instancePropService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.instancePropService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.instancePropService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.instancePropService.delete(data);
  }
}
