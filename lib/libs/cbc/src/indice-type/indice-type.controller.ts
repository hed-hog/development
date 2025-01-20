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
import { IndiceTypeService } from './indice-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('indice-type')
export class IndiceTypeController {
  constructor(
    @Inject(forwardRef(() => IndiceTypeService))
    private readonly indiceTypeService: IndiceTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.indiceTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.indiceTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.indiceTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.indiceTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.indiceTypeService.delete(data);
  }
}
