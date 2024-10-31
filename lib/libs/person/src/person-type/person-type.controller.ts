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
import { DeleteDTO } from '../dto/delete.dto';
import { CreatePersonTypeDTO } from './dto/create-person-type.dto';
import { UpdatePersonTypeDTO } from './dto/update-person-type.dto';
import { PersonTypeService } from './person-type.service';

@Role()
@Controller('person-type')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Post()
  async create(@Body() data: CreatePersonTypeDTO) {
    return this.personTypeService.create(data);
  }

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.personTypeService.list(locale, paginationParams);
  }

  @Get(':personTypeId')
  async get(@Param('personTypeId', ParseIntPipe) id: number, @Locale() locale) {
    return this.personTypeService.get(locale, id);
  }

  @Patch(':personTypeId')
  async update(
    @Param('personTypeId', ParseIntPipe) id: number,
    @Body() data: UpdatePersonTypeDTO,
  ) {
    return this.personTypeService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personTypeService.delete(data);
  }
}
