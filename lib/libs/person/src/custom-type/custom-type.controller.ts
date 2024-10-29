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
import { CustomTypeService } from './custom-type.service';
import { CreateCustomTypeDTO } from './dto/create-custom-type.dto';
import { UpdateCustomTypeDTO } from './dto/update-custom-type.dto';

@Role()
@Controller('custom-types')
export class CustomTypeController {
  constructor(private readonly customTypeService: CustomTypeService) {}

  @Post()
  create(@Body() data: CreateCustomTypeDTO) {
    return this.customTypeService.create(data);
  }

  @Get()
  getCustomTypes(@Pagination() paginationParams, @Locale() locale: string) {
    return this.customTypeService.getCustomTypes(locale, paginationParams);
  }

  @Get(':id')
  getCustomTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.customTypeService.getCustomTypeById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCustomTypeDTO,
  ) {
    return this.customTypeService.update(id, data);
  }

  @Delete()
  remove(@Body() data: DeleteDTO) {
    return this.customTypeService.remove(data);
  }
}
