import { MenuLocale } from './MenuLocale';
import { DashboardComponentLocale } from './DashboardComponentLocale';
import { Translation } from './Translation';
import { DashboardLocale } from './DashboardLocale';
import { SettingLocale } from './SettingLocale';
import { ScreenLocale } from './ScreenLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { RoleLocale } from './RoleLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  menu_locale?: MenuLocale[];
  dashboard_component_locale?: DashboardComponentLocale[];
  translation?: Translation[];
  dashboard_locale?: DashboardLocale[];
  setting_locale?: SettingLocale[];
  screen_locale?: ScreenLocale[];
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  role_locale?: RoleLocale[];
}