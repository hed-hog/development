import { ComponentPropTypeLocale } from './ComponentPropTypeLocale';
import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { ComponentTypeLocale } from './ComponentTypeLocale';
import { RoleLocale } from './RoleLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  component_prop_type_locale?: ComponentPropTypeLocale[];
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  component_type_locale?: ComponentTypeLocale[];
  role_locale?: RoleLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
}