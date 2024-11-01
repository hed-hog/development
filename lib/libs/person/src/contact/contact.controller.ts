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
import { ContactService } from './contact.service';
import { CreatePersonContactDTO } from './dto/create-contact.dto';
import { UpdatePersonContactDTO } from './dto/update-contact.dto';

@Role()
@Controller('person/:personId/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Post()
  create(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() data: CreatePersonContactDTO,
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
    @Body() data: UpdatePersonContactDTO,
  ) {
    return this.contactService.update(id, data);
  }

  @Delete(':contactId')
  delete(@Param('contactId', ParseIntPipe) ContactId: number) {
    return this.contactService.delete(ContactId);
  }
}
