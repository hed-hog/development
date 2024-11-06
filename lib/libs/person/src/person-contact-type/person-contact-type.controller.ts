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
import { DeleteDTO } from './dto/delete.dto';
import { PersonContactTypeService } from './person-contact-type.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Role()
@Controller('contact-type')
export class PersonContactTypeController {
  constructor(private readonly contactTypeService: PersonContactTypeService) {}

  @Post()
  create(@Body() data: CreateDTO) {
    return this.contactTypeService.create(data);
  }

  @Get()
  getContactTypes(@Pagination() paginationParams, @Locale() locale) {
    return this.contactTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  getContactTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.contactTypeService.get(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.contactTypeService.update(id, data);
  }

  @Delete()
  remove(@Body() data: DeleteDTO) {
    return this.contactTypeService.delete(data);
  }
}
