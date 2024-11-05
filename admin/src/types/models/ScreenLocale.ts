import { Screen } from './Screen';
import { Locale } from './Locale';

export type ScreenLocale = {
  screen_id?: number;
  locale_id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  screen?: Screen;
  locale?: Locale;
}