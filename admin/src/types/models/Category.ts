import { CategoryLocale } from './CategoryLocale';

export type Category = {
  id?: number;
  slug: string;
  category_id: number;
  created_at?: string;
  updated_at?: string;
  category?: Category;
  other_category?: Category[];
  category_locale?: CategoryLocale[];
  name?: string;
}