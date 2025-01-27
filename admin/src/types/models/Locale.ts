import { ScreenLocale } from './ScreenLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { RoleLocale } from './RoleLocale';
import { MenuLocale } from './MenuLocale';
import { Translation } from './Translation';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  screen_locale?: ScreenLocale[];
  multifactor_locale?: MultifactorLocale[];
  role_locale?: RoleLocale[];
  menu_locale?: MenuLocale[];
  translation?: Translation[];
}