import { Screens } from './Screens';
import { Locales } from './Locales';

export type ScreenTranslations = {
  screen_id?: number;
  locale_id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  screens?: Screens;
  locales?: Locales;
}