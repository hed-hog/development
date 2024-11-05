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
import { DeleteDTO } from '../dto/delete.dto';
import { CustomTypeService } from './custom-type.service';
import { CreateCustomTypeDTO } from './dto/create-custom-type.dto';
import { UpdateCustomTypeDTO } from './dto/update-custom-type.dto';

@Role()
@Controller('custom-type')
export class CustomTypeController {
  constructor(private readonly customTypeService: CustomTypeService) {}

  @Post()
  create(@Body() data: CreateCustomTypeDTO) {
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCustomTypeDTO,
  ) {
    return this.customTypeService.update(id, data);
  }

  @Delete()
  delete(@Body() data: DeleteDTO) {
    return this.customTypeService.delete(data);
  }
}
