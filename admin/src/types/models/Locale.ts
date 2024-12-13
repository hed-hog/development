import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { RoleLocale } from './RoleLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { TrendTypeLocale } from './TrendTypeLocale';
import { SettingLocale } from './SettingLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  setting_group_locale?: SettingGroupLocale[];
  role_locale?: RoleLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  trend_type_locale?: TrendTypeLocale[];
  setting_locale?: SettingLocale[];
}