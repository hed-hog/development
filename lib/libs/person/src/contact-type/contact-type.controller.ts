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
import { ContactTypeService } from './contact-type.service';
import { CreateContactTypeDTO } from './dto/create-contact-type.dto';
import { UpdateContactTypeDTO } from './dto/update-contact-type.dto';

@Role()
@Controller('contact-types')
export class ContactTypeController {
  constructor(private readonly contactTypeService: ContactTypeService) {}

  @Post()
  create(@Body() data: CreateContactTypeDTO) {
    return this.contactTypeService.create(data);
  }

  @Get()
  getContactTypes(@Pagination() paginationParams, @Locale() locale) {
    return this.contactTypeService.getContactTypes(locale, paginationParams);
  }

  @Get(':id')
  getContactTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.contactTypeService.getContactTypeById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContactTypeDTO,
  ) {
    return this.contactTypeService.update(id, data);
  }

  @Delete()
  remove(@Body() data: DeleteDTO) {
    return this.contactTypeService.remove(data);
  }
}
