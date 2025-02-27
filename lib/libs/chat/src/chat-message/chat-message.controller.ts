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
import { ChatMessageService } from './chat-message.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('chat-message')
export class ChatMessageController {
  constructor(
    @Inject(forwardRef(() => ChatMessageService))
    private readonly chatMessageService: ChatMessageService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.chatMessageService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.chatMessageService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.chatMessageService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.chatMessageService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.chatMessageService.delete(data);
  }
}
