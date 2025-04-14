import { Tag } from './Tag';
import { Locale } from './Locale';

export type TagLocale = {
  tag_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  tag?: Tag;
  locale?: Locale;
}