import { ChatRoomPerson } from './ChatRoomPerson';
import { ChatMessage } from './ChatMessage';

export type ChatRoom = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  chat_room_person?: ChatRoomPerson[];
  chat_message?: ChatMessage[];
}