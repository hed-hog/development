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
import { UpdateIdsDTO } from './dto/update-ids.dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() data: CreatePersonDTO) {
    return this.personService.create(data);
  }

  @Get()
  getPersons(@Pagination() paginationParams) {
    return this.personService.getPersons(paginationParams);
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

  @Get(':id/documents')
  getPersonDocuments(
    @Param('id', ParseIntPipe) personId: number,
    @Pagination() paginationParams,
  ) {
    return this.personService.listDocuments(personId, paginationParams);
  }

  @Get(':id/contacts')
  getPersonContacts(
    @Param('id', ParseIntPipe) personId: number,
    @Pagination() paginationParams,
  ) {
    return this.personService.listContacts(personId, paginationParams);
  }

  @Get(':id/addresses')
  getPersonAddresses(
    @Param('id', ParseIntPipe) personId: number,
    @Pagination() paginationParams,
  ) {
    return this.personService.listAddresses(personId, paginationParams);
  }

  @Patch(':id/documents')
  async updateDocuments(
    @Param('id') personId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.personService.updateDocuments(personId, data);
  }

  @Patch(':id/contacts')
  async updateContacts(
    @Param('id') personId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.personService.updateContacts(personId, data);
  }

  @Patch(':id/addresses')
  async updateAddresses(
    @Param('id') personId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.personService.updateAddresses(personId, data);
  }
}
