import { Pagination } from '@hedhog/pagination';
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
import { PersonTestService } from './person-test.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person-test')
export class PersonTestController {
  constructor(
    @Inject(forwardRef(() => PersonTestService))
    private readonly personTestService: PersonTestService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.personTestService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.personTestService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personTestService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personTestService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personTestService.delete(data);
  }
}
