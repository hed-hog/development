import { MenuLocale } from './MenuLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { SettingLocale } from './SettingLocale';
import { TrendTypeLocale } from './TrendTypeLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { Translation } from './Translation';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  menu_locale?: MenuLocale[];
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  setting_locale?: SettingLocale[];
  trend_type_locale?: TrendTypeLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  translation?: Translation[];
}