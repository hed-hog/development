import { Category } from './Category';
import { Locale } from './Locale';

export type CategoryLocale = {
  category_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  category?: Category;
  locale?: Locale;
}