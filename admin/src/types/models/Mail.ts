import { MailVar } from './MailVar';
import { MailLocale } from './MailLocale';
import { MailSent } from './MailSent';

export type Mail = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  mail_var?: MailVar[];
  mail_locale?: MailLocale[];
  mail_sent?: MailSent[];
  subject?: string;
  body?: string;
}