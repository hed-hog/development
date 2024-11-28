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
import { PersonCustomService } from './person-custom.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';
import { Locale } from '@hedhog/locale';

@Role()
@Controller('person/:personId/person-custom')
export class PersonCustomController {
  constructor(
    @Inject(forwardRef(() => PersonCustomService))
    private readonly personCustomService: PersonCustomService
  ) {}

  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreateDTO
  ) {
    return this.personCustomService.create(personId, data);
  }

  @Get()
  list(
    @Locale() locale,
    @Param('personId', ParseIntPipe) personId: number,
    @Pagination() paginationParams
  ) {
    return this.personCustomService.list(locale, personId, paginationParams);
  }

  @Patch(':id')
  update(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.personCustomService.update(personId, id, data);
  }

  @Delete()
  delete(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.personCustomService.delete(personId, { ids });
  }
}
