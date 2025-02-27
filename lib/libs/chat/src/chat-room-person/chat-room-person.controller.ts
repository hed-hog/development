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
import { ChatRoomPersonService } from './chat-room-person.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('chat-room-person')
export class ChatRoomPersonController {
  constructor(
    @Inject(forwardRef(() => ChatRoomPersonService))
    private readonly chatRoomPersonService: ChatRoomPersonService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.chatRoomPersonService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomPersonService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.chatRoomPersonService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.chatRoomPersonService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.chatRoomPersonService.delete(data);
  }
}
