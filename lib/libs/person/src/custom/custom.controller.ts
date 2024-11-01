import { Role } from '@hedhog/admin';
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
import { OptionalParseIntPipe } from '../pipes/optional-parse-int.pipe';
import { CustomService } from './custom.service';
import { CreatePersonCustomDTO } from './dto/create-custom.dto';
import { UpdatePersonCustomDTO } from './dto/update-custom.dto';

@Role()
@Controller('person/:personId/customs')
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
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) customId?: number,
  ) {
    if (customId) {
      return this.customService.list(personId, null, customId);
    }
    if (typeId) {
      return this.customService.list(personId, typeId);
    }
    return this.customService.list(personId);
  }

  @Patch(':customId')
  update(
    @Param('customId', ParseIntPipe) id: number,
    @Body() data: UpdatePersonCustomDTO,
  ) {
    return this.customService.update(id, data);
  }

  @Delete(':customId')
  delete(@Param('customId', ParseIntPipe) CustomId: number) {
    return this.customService.delete(CustomId);
  }
}
