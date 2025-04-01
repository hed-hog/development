import { Setting } from './Setting';
import { SettingGroupLocale } from './SettingGroupLocale';

export type SettingGroup = {
  id?: number;
  icon: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  setting?: Setting[];
  setting_group_locale?: SettingGroupLocale[];
  name?: string;
  description?: string;
}