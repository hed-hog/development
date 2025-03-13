import { Locale } from './Locale';
import { Setting } from './Setting';

export type SettingLocale = {
  locale_id?: number;
  setting_id?: number;
  description?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  locale?: Locale;
  setting?: Setting;
}