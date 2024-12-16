import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { Translation } from './Translation';
import { SettingLocale } from './SettingLocale';
import { MenuLocale } from './MenuLocale';
import { TrendTypeLocale } from './TrendTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  translation?: Translation[];
  setting_locale?: SettingLocale[];
  menu_locale?: MenuLocale[];
  trend_type_locale?: TrendTypeLocale[];
}