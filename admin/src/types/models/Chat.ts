import { ChatMessage } from './ChatMessage';
import { ChatPerson } from './ChatPerson';

export type Chat = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  chat_message?: ChatMessage[];
  chat_person?: ChatPerson[];
}