import { Role } from '@hedhog/utils';
import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from './dto/delete.dto';
import { PersonService } from './person.service';

@Role()
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() data: CreateDTO) {
    return this.personService.create(data);
  }

  @Get()
  list(@Pagination() paginationParams, @Locale() locale) {
    return this.personService.list(locale, paginationParams);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.personService.get(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.personService.delete(data);
  }
}
