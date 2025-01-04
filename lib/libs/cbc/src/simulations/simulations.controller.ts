import { DeleteDTO, Role } from '@hedhog/core';
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
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { SimulationsService } from './simulations.service';

@Role()
@Controller('simulations')
export class SimulationsController {
  constructor(
    @Inject(forwardRef(() => SimulationsService))
    private readonly simulationsService: SimulationsService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.simulationsService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.simulationsService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.simulationsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.simulationsService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.simulationsService.delete(data);
  }
}
