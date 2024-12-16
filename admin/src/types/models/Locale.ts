import { SettingLocale } from './SettingLocale';
import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { TrendTypeLocale } from './TrendTypeLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { RoleLocale } from './RoleLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  setting_locale?: SettingLocale[];
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  setting_group_locale?: SettingGroupLocale[];
  trend_type_locale?: TrendTypeLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  role_locale?: RoleLocale[];
}