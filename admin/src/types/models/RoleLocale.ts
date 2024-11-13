import { Role } from './Role';
import { Locale } from './Locale';

export type RoleLocale = {
  role_id?: number;
  locale_id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  role?: Role;
  locale?: Locale;
}