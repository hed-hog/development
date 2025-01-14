import { Pagination } from '@hedhog/pagination';
import { Locale } from '@hedhog/locale';
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
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { SimulationService } from './simulation.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('simulation')
export class SimulationController {
  constructor(
    @Inject(forwardRef(() => SimulationService))
    private readonly simulationService: SimulationService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.simulationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.simulationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.simulationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.simulationService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.simulationService.delete(data);
  }
}
