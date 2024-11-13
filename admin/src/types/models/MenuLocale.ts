import { Menu } from './Menu';
import { Locale } from './Locale';

export type MenuLocale = {
  menu_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  menu?: Menu;
  locale?: Locale;
}