import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ChatRoomPersonService } from './chat-room-person.service';
import { ChatRoomPersonController } from './chat-room-person.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [ChatRoomPersonController],
  providers: [ChatRoomPersonService],
  exports: [ChatRoomPersonService]
})
export class ChatRoomPersonModule {}
