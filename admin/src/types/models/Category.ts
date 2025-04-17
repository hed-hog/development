import { CategoryLocale } from './CategoryLocale';

export type Category = {
  id?: number;
  slug: string;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
  category?: Category;
<<<<<<< HEAD
  category_locale?: CategoryLocale[];
  other_category?: Category[];
=======
  other_category?: Category[];
  category_locale?: CategoryLocale[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
  name?: string;
}