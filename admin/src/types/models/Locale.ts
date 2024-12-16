import { Translation } from './Translation';
import { MenuLocale } from './MenuLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { SettingLocale } from './SettingLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { RoleLocale } from './RoleLocale';
import { ScreenLocale } from './ScreenLocale';
import { TrendTypeLocale } from './TrendTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  translation?: Translation[];
  menu_locale?: MenuLocale[];
  multifactor_locale?: MultifactorLocale[];
  setting_group_locale?: SettingGroupLocale[];
  setting_locale?: SettingLocale[];
  file_provider_locale?: FileProviderLocale[];
  role_locale?: RoleLocale[];
  screen_locale?: ScreenLocale[];
  trend_type_locale?: TrendTypeLocale[];
}