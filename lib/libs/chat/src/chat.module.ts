import { ChatMessageModule } from './chat-message/chat-message.module';
import { ChatRoomPersonModule } from './chat-room-person/chat-room-person.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => ChatRoomModule),
    forwardRef(() => ChatRoomPersonModule),
    forwardRef(() => ChatMessageModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ChatModule {}
