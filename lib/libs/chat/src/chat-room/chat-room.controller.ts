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
import { ChatRoomService } from './chat-room.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('chat-room')
export class ChatRoomController {
  constructor(
    @Inject(forwardRef(() => ChatRoomService))
    private readonly chatRoomService: ChatRoomService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.chatRoomService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.chatRoomService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.chatRoomService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.chatRoomService.delete(data);
  }
}
