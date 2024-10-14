import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDTO } from './dto/create-person.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
import { Pagination } from '@hedhog/pagination';
import { DeleteDTO } from './dto/delete.dto';
import { Locale } from '@hedhog/admin';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() data: CreatePersonDTO) {
    return this.personService.create(data);
  }

  @Get()
  getPersons(@Pagination() paginationParams, @Locale() locale) {
    return this.personService.getPersons(locale, paginationParams);
  }

  @Get(':id')
  getPersonById(@Param('id', ParseIntPipe) id: number) {
    return this.personService.getPersonById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePersonDTO) {
    return this.personService.update(id, data);
  }

  @Delete()
  remove(@Body() data: DeleteDTO) {
    return this.personService.remove(data);
  }

  @Patch(':id/documents')
  updateDocuments(@Param('id', ParseIntPipe) personId: number) {}
}
