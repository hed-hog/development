import { Post } from './Post';
import { CategoryLocale } from './CategoryLocale';

export type Category = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  post?: Post[];
  category_locale?: CategoryLocale[];
  name?: string;
  description?: string;
}