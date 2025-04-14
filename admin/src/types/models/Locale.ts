import { DashboardComponentLocale } from './DashboardComponentLocale';
import { RoleLocale } from './RoleLocale';
import { SettingLocale } from './SettingLocale';
import { Translation } from './Translation';
import { MailLocale } from './MailLocale';
import { DashboardLocale } from './DashboardLocale';
import { ScreenLocale } from './ScreenLocale';
import { MenuLocale } from './MenuLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { ContentLocale } from './ContentLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  dashboard_component_locale?: DashboardComponentLocale[];
  role_locale?: RoleLocale[];
  setting_locale?: SettingLocale[];
  translation?: Translation[];
  mail_locale?: MailLocale[];
  dashboard_locale?: DashboardLocale[];
  screen_locale?: ScreenLocale[];
  menu_locale?: MenuLocale[];
  multifactor_locale?: MultifactorLocale[];
  setting_group_locale?: SettingGroupLocale[];
  content_locale?: ContentLocale[];
}