import { Content } from './Content';
import { Locale } from './Locale';

export type ContentLocale = {
  id?: number;
  content_id: number;
  locale_id: number;
  title: string;
  body: string;
  created_at?: string;
  updated_at?: string;
  content?: Content;
  locale?: Locale;
}