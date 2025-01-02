import { MultifactorLocale } from './MultifactorLocale';
import { RoleLocale } from './RoleLocale';
import { FaqLocale } from './FaqLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { ScreenLocale } from './ScreenLocale';
import { SettingLocale } from './SettingLocale';
import { MenuLocale } from './MenuLocale';
import { Translation } from './Translation';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  multifactor_locale?: MultifactorLocale[];
  role_locale?: RoleLocale[];
  faq_locale?: FaqLocale[];
  setting_group_locale?: SettingGroupLocale[];
  screen_locale?: ScreenLocale[];
  setting_locale?: SettingLocale[];
  menu_locale?: MenuLocale[];
  translation?: Translation[];
}