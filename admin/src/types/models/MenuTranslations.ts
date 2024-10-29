import { Menus } from './Menus';
import { Locales } from './Locales';

export type MenuTranslations = {
  menu_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  menus?: Menus;
  locales?: Locales;
}