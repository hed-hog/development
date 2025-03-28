import { Translation } from './Translation';
import { DashboardComponentLocale } from './DashboardComponentLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { DashboardLocale } from './DashboardLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { SettingLocale } from './SettingLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  translation?: Translation[];
  dashboard_component_locale?: DashboardComponentLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  dashboard_locale?: DashboardLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  setting_group_locale?: SettingGroupLocale[];
  setting_locale?: SettingLocale[];
}