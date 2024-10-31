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
import { PlanService } from './plan.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('plan')
export class PlanController {
  constructor(
    @Inject(forwardRef(() => PlanService))
    private readonly planService: PlanService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale) {
    return this.planService.get(locale, paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.planService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.planService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.planService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.planService.delete(data);
  }
}
