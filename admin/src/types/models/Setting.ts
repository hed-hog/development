import { SettingTypeEnum } from './SettingTypeEnum';
import { SettingGroup } from './SettingGroup';
import { SettingLocale } from './SettingLocale';
import { SettingUser } from './SettingUser';

export type Setting = {
  id?: number;
  group_id: number;
  slug: string;
  type?: SettingTypeEnum;
  value?: string;
  user_override?: boolean;
  created_at?: string;
  updated_at?: string;
  setting_group?: SettingGroup;
  setting_locale?: SettingLocale[];
  setting_user?: SettingUser[];
  description?: string;
  name?: string;
}