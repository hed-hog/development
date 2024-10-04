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
import { CustomService } from './custom.service';
import { UpdatePersonCustomDTO } from './dto/update-custom.dto';
import { CreatePersonCustomDTO } from './dto/create-custom.dto';

@Controller('persons/:personId/customs')
export class CustomController {
  constructor(private readonly customService: CustomService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreatePersonCustomDTO,
  ) {
    return this.customService.create(personId, data);
  }

  @Get()
  getCustoms(@Param('personId', ParseIntPipe) personId: number) {
    return this.customService.getCustoms(personId);
  }

  @Get(':customId')
  getCustomById(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('customId', ParseIntPipe) customId: number,
  ) {
    return this.customService.getCustomById(personId, customId);
  }

  @Patch(':customId')
  update(
    @Param('customId', ParseIntPipe) id: number,
    @Body() data: UpdatePersonCustomDTO,
  ) {
    return this.customService.update(id, data);
  }

  @Delete(':customId')
  remove(@Param('customId', ParseIntPipe) CustomId: number) {
    return this.customService.remove(CustomId);
  }
}
