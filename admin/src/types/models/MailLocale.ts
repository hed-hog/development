import { Mail } from './Mail';
import { Locale } from './Locale';

export type MailLocale = {
  mail_id?: number;
  locale_id?: number;
  subject: string;
  body: string;
  created_at?: string;
  updated_at?: string;
  mail?: Mail;
  locale?: Locale;
}