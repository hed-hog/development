import { Locale } from '@hedhog/admin';
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
import { PlansService } from './plans.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('plans')
export class PlansController {
  constructor(
    @Inject(forwardRef(() => PlansService))
    private readonly plansService: PlansService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale) {
    return this.plansService.get(paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.plansService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.plansService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.plansService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.plansService.delete(data);
  }
}
