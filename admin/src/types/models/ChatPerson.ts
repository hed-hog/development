import { ChatPersonRoleEnum } from './ChatPersonRoleEnum';
import { Chat } from './Chat';
import { Person } from './Person';

export type ChatPerson = {
  id?: number;
  chat_id: number;
  person_id: number;
  role: ChatPersonRoleEnum;
  created_at?: string;
  updated_at?: string;
  chat?: Chat;
  person?: Person;
}