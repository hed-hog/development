import { Pagination } from '@hedhog/pagination';
import { Role } from '@hedhog/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Inject,
  forwardRef
} from '@nestjs/common';
import { PersonValueService } from './person-value.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person/:personId/person-value')
export class PersonValueController {
  constructor(
    @Inject(forwardRef(() => PersonValueService))
    private readonly personValueService: PersonValueService
  ) {}

  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreateDTO
  ) {
    return this.personValueService.create(personId, data);
  }

  @Get()
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Pagination() paginationParams
  ) {
    return this.personValueService.list(paginationParams, personId);
  }

  @Get(':id')
  get(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.personValueService.get(personId, id);
  }

  @Patch(':id')
  update(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.personValueService.update(personId, id, data);
  }

  @Delete()
  delete(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.personValueService.delete(personId, { ids });
  }
}
