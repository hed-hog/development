import { ChatRoomPersonRoleEnum } from './ChatRoomPersonRoleEnum';
import { ChatRoom } from './ChatRoom';
import { Person } from './Person';

export type ChatRoomPerson = {
  id?: number;
  chat_id: number;
  person_id: number;
  role: ChatRoomPersonRoleEnum;
  created_at?: string;
  updated_at?: string;
  chat_room?: ChatRoom;
  person?: Person;
}