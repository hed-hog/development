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
import { PlanDurationService } from './plan-duration.service';
import { Role } from '@hedhog/utils';

@Role()
@Controller('plan-duration')
export class PlanDurationController {
  constructor(
    @Inject(forwardRef(() => PlanDurationService))
    private readonly planDurationService: PlanDurationService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.planDurationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.planDurationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.planDurationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.planDurationService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.planDurationService.delete(data);
  }
}
