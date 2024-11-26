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
import { PersonService } from './person.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person')
export class PersonController {
  constructor(
    @Inject(forwardRef(() => PersonService))
    private readonly personService: PersonService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.personService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.personService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personService.delete(data);
  }
}
