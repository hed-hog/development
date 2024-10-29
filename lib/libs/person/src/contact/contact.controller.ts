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
@Controller('persons/:personId/contacts')
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
  getContacts(
    @Param('personId', ParseIntPipe) personId: number,
    @Query('typeId', OptionalParseIntPipe) typeId?: number,
    @Query('id', OptionalParseIntPipe) contactId?: number,
  ) {
    if (contactId) {
      return this.contactService.getContactById(contactId);
    }
    if (typeId) {
      return this.contactService.getContactByTypeId(personId, typeId);
    }
    return this.contactService.getContacts(personId);
  }

  @Patch(':contactId')
  update(
    @Param('contactId', ParseIntPipe) id: number,
    @Body() data: UpdatePersonContactDTO,
  ) {
    return this.contactService.update(id, data);
  }

  @Delete(':contactId')
  remove(@Param('contactId', ParseIntPipe) ContactId: number) {
    return this.contactService.remove(ContactId);
  }
}
