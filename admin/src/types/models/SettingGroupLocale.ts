import { Locale } from './Locale';
import { SettingGroup } from './SettingGroup';

export type SettingGroupLocale = {
  locale_id?: number;
  group_id?: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  locale?: Locale;
  setting_group?: SettingGroup;
}