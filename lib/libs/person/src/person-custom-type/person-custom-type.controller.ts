import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { PersonCustomTypeService } from './person-custom-type.service';
import { Role } from '@hedhog/utils';

@Role()
@Controller('custom-type')
export class PersonCustomTypeController {
  constructor(
    @Inject(forwardRef(() => PersonCustomTypeService))
    private readonly personCustomTypeService: PersonCustomTypeService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams, @Locale() locale) {
    return this.personCustomTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.personCustomTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.personCustomTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.personCustomTypeService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.personCustomTypeService.delete(data);
  }
}
