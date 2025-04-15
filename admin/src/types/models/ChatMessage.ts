import { ChatMessageTypeEnum } from './ChatMessageTypeEnum';
import { Chat } from './Chat';
import { Person } from './Person';

export type ChatMessage = {
  id?: number;
  chat_id: number;
  person_id: number;
  type: ChatMessageTypeEnum;
  content: string;
  read_at?: string;
  received_at?: string;
  created_at?: string;
  updated_at?: string;
  chat?: Chat;
  person?: Person;
}