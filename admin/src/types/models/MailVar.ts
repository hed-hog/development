import { Mail } from './Mail';

export type MailVar = {
  id?: number;
  mail_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  mail?: Mail;
}