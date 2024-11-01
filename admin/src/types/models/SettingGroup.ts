import { SettingGroupLocale } from './SettingGroupLocale';
import { Setting } from './Setting';

export type SettingGroup = {
  id?: number;
  icon: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  setting_group_locale?: SettingGroupLocale[];
  setting?: Setting[];
  name?: string;
  description?: string;
}