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
import { PersonCustomTypeService } from './person-custom-type.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Role()
@Controller('custom-type')
export class PersonCustomTypeController {
  constructor(private readonly customTypeService: PersonCustomTypeService) {}

  @Post()
  create(@Body() data: CreateDTO) {
    return this.customTypeService.create(data);
  }

  @Get()
  list(@Pagination() paginationParams, @Locale() locale: string) {
    return this.customTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customTypeService.get(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.customTypeService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.customTypeService.delete(data);
  }
}
