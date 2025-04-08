import { ChatMessage } from './ChatMessage';
import { ChatRoomPerson } from './ChatRoomPerson';

export type ChatRoom = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  chat_message?: ChatMessage[];
  chat_room_person?: ChatRoomPerson[];
}