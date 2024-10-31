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
import { Plan_durationsService } from './plan_durations.service';
import { Role } from '@hedhog/admin';

@Role()
@Controller('plan_durations')
export class Plan_durationsController {
  constructor(
    @Inject(forwardRef(() => Plan_durationsService))
    private readonly plan_durationsService: Plan_durationsService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale) {
    return this.plan_durationsService.get(paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.plan_durationsService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.plan_durationsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.plan_durationsService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.plan_durationsService.delete(data);
  }
}
