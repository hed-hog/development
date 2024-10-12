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
import { PersonTypeService } from './person-type.service';
import { CreatePersonTypeDTO } from './dto/create-person-type.dto';
import { Pagination } from '@hedhog/pagination';
import { UpdatePersonTypeDTO } from './dto/update-person-type.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { Locale } from '@hedhog/admin';

@Controller('person-types')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Post()
  create(@Body() data: CreatePersonTypeDTO) {
    return this.personTypeService.create(data);
  }

  @Get()
  getpersonTypes(@Pagination() paginationParams, @Locale() locale) {
    return this.personTypeService.getPersonTypes(locale, paginationParams);
  }

  @Get(':id')
  getpersonTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.personTypeService.getPersonTypeById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePersonTypeDTO,
  ) {
    return this.personTypeService.update(id, data);
  }

  @Delete()
  remove(@Body() data: DeleteDTO) {
    return this.personTypeService.remove(data);
  }
}
