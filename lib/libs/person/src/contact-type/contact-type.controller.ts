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
import { ContactTypeService } from './contact-type.service';
import { CreateContactTypeDTO } from './dto/create-contact-type.dto';
import { Pagination } from '@hedhog/pagination';
import { UpdateContactTypeDTO } from './dto/update-contact-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Controller('contact-types')
export class ContactTypeController {
  constructor(private readonly contactTypeService: ContactTypeService) {}

  @Post()
  create(@Body() data: CreateContactTypeDTO) {
    return this.contactTypeService.create(data);
  }

  @Get()
  getContactTypes(@Pagination() paginationParams) {
    return this.contactTypeService.getContactTypes(paginationParams);
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
