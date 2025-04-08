import { MailLocale } from './MailLocale';
import { MailSent } from './MailSent';
import { MailVar } from './MailVar';

export type Mail = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  mail_locale?: MailLocale[];
  mail_sent?: MailSent[];
  mail_var?: MailVar[];
  subject?: string;
  body?: string;
}