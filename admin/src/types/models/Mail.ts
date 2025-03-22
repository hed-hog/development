import { MailSent } from './MailSent';
import { MailVar } from './MailVar';

export type Mail = {
  id?: number;
  slug: string;
  subject: string;
  body: string;
  created_at?: string;
  updated_at?: string;
  mail_sent?: MailSent[];
  mail_var?: MailVar[];
}