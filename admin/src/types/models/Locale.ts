import { RoleLocale } from './RoleLocale';
import { ScreenLocale } from './ScreenLocale';
import { MenuLocale } from './MenuLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { SettingLocale } from './SettingLocale';
import { Translation } from './Translation';
import { MultifactorLocale } from './MultifactorLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  role_locale?: RoleLocale[];
  screen_locale?: ScreenLocale[];
  menu_locale?: MenuLocale[];
  setting_group_locale?: SettingGroupLocale[];
  setting_locale?: SettingLocale[];
  translation?: Translation[];
  multifactor_locale?: MultifactorLocale[];
}