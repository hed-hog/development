import { SettingsTypeEnum } from './SettingsTypeEnum';
import { SettingGroups } from './SettingGroups';
import { SettingUsers } from './SettingUsers';
import { SettingTranslations } from './SettingTranslations';

export type Settings = {
  id?: number;
  group_id: number;
  slug: string;
  type?: SettingsTypeEnum;
  value?: string;
  user_override?: boolean;
  created_at?: string;
  updated_at?: string;
  setting_groups?: SettingGroups;
  setting_users?: SettingUsers[];
  setting_translations?: SettingTranslations[];
  description?: string;
  name?: string;
}