import { DashboardLocale } from './DashboardLocale';
import { ScreenLocale } from './ScreenLocale';
import { SettingLocale } from './SettingLocale';
import { DashboardComponentLocale } from './DashboardComponentLocale';
import { RoleLocale } from './RoleLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MenuLocale } from './MenuLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { Translation } from './Translation';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  dashboard_locale?: DashboardLocale[];
  screen_locale?: ScreenLocale[];
  setting_locale?: SettingLocale[];
  dashboard_component_locale?: DashboardComponentLocale[];
  role_locale?: RoleLocale[];
  setting_group_locale?: SettingGroupLocale[];
  menu_locale?: MenuLocale[];
  multifactor_locale?: MultifactorLocale[];
  translation?: Translation[];
}