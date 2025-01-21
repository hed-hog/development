import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { RoleLocale } from './RoleLocale';
import { SettingLocale } from './SettingLocale';
import { FaqLocale } from './FaqLocale';

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
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  role_locale?: RoleLocale[];
  setting_locale?: SettingLocale[];
  faq_locale?: FaqLocale[];
}