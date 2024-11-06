import { Role } from '@hedhog/utils';
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
import { PersonContactService } from './person-contact.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Role()
@Controller('person/:personId/contact')
export class PersonContactController {
  constructor(private readonly contactService: PersonContactService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreateDTO,
  ) {
    return this.contactService.create(personId, data);
  }

  @Get()
  list(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) contactId?: number,
  ) {
    if (contactId) {
      return this.contactService.list(personId, null, contactId);
    }
    if (typeId) {
      return this.contactService.list(personId, typeId);
    }
    return this.contactService.list(personId);
  }

  @Patch(':contactId')
  update(
    @Param('contactId', ParseIntPipe) id: number,
    @Body() data: UpdateDTO,
  ) {
    return this.contactService.update(id, data);
  }

  @Delete(':contactId')
  delete(@Param('contactId', ParseIntPipe) ContactId: number) {
    return this.contactService.delete(ContactId);
  }
}
