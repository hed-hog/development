import { MailSent } from './MailSent';
import { MailLocale } from './MailLocale';
import { MailVar } from './MailVar';

export type Mail = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  mail_sent?: MailSent[];
  mail_locale?: MailLocale[];
  mail_var?: MailVar[];
  subject?: string;
  body?: string;
}