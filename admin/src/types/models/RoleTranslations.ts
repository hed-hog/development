import { Roles } from './Roles';
import { Locales } from './Locales';

export type RoleTranslations = {
  role_id?: number;
  locale_id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  roles?: Roles;
  locales?: Locales;
}