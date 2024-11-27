import { DeleteDTO, OptionalParseIntPipe, Role } from '@hedhog/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { PersonValueService } from './person-value.service';

@Role()
@Controller('person/:personId/value')
export class PersonValueController {
  constructor(private readonly valueService: PersonValueService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreateDTO,
  ) {
    return this.valueService.create(personId, data);
  }

  @Get()
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('id', OptionalParseIntPipe) valueId?: number,
  ) {
    if (valueId) {
      return this.valueService.list(personId, null, valueId);
    }
    return this.valueService.list(personId);
  }

  @Patch(':valueId')
  update(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('valueId', ParseIntPipe) valueId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.valueService.update(personId, valueId, data);
  }

  @Delete()
  delete(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() { ids }: DeleteDTO,
  ) {
    return this.valueService.delete(personId, { ids });
  }
}
