import { Locale, Role } from '@hedhog/admin';
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
import { CreatePersonDTO } from './dto/create-person.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
import { PersonService } from './person.service';

@Role()
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() data: CreatePersonDTO) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePersonDTO) {
    return this.personService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.personService.delete(data);
  }
}
