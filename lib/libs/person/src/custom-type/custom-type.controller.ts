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
import { CustomTypeService } from './custom-type.service';
import { CreateCustomTypeDTO } from './dto/create-custom-type.dto';
import { Pagination } from '@hedhog/pagination';
import { UpdateCustomTypeDTO } from './dto/update-custom-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

@Controller('custom-types')
export class CustomTypeController {
  constructor(private readonly customTypeService: CustomTypeService) {}

  @Post()
  create(@Body() data: CreateCustomTypeDTO) {
    return this.customTypeService.create(data);
  }

  @Get()
  getCustomTypes(@Pagination() paginationParams) {
    return this.customTypeService.getcustomTypes(paginationParams);
  }

  @Get(':id')
  getCustomTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.customTypeService.getcustomTypeById(id);
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
