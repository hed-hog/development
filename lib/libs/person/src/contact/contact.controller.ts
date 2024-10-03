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
import { ContactService } from './contact.service';
import { UpdatePersonContactDTO } from './dto/update-contact.dto';
import { CreatePersonContactDTO } from './dto/create-contact.dto';

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
  getContacts(@Param('personId', ParseIntPipe) personId: number) {
    return this.contactService.getContacts(personId);
  }

  @Get(':contactId')
  getContactById(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('contactId', ParseIntPipe) typeId: number,
  ) {
    return this.contactService.getContactById(personId, typeId);
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
