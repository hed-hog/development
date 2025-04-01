import { Mail } from './Mail';

export type MailSent = {
  id?: number;
  mail_id: number;
  subject: string;
  from: string;
  to?: string;
  cc?: string;
  bcc?: string;
  body: string;
  created_at?: string;
  updated_at?: string;
  mail?: Mail;
}