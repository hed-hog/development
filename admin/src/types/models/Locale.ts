import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { SettingLocale } from './SettingLocale';
import { CountryLocale } from './CountryLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { CategoryLocale } from './CategoryLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  setting_locale?: SettingLocale[];
  country_locale?: CountryLocale[];
  setting_group_locale?: SettingGroupLocale[];
  category_locale?: CategoryLocale[];
}