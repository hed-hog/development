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
import { PersonUserService } from './person-user.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('person/:personId/person-user')
export class PersonUserController {
  constructor(
    @Inject(forwardRef(() => PersonUserService))
    private readonly personUserService: PersonUserService
  ) {}

  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreateDTO
  ) {
    return this.personUserService.create(personId, data);
  }

  @Get()
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Pagination() paginationParams
  ) {
    return this.personUserService.list(paginationParams, personId);
  }

  @Get(':id')
  get(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.personUserService.get(personId, id);
  }

  @Patch(':id')
  update(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.personUserService.update(personId, id, data);
  }

  @Delete()
  delete(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.personUserService.delete(personId, { ids });
  }
}
