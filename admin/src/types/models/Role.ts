import { RoleLocale } from './RoleLocale';
import { RoleMenu } from './RoleMenu';
import { RoleScreen } from './RoleScreen';
import { RoleUser } from './RoleUser';
import { RoleRoute } from './RoleRoute';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_locale?: RoleLocale[];
  role_menu?: RoleMenu[];
  role_screen?: RoleScreen[];
  role_user?: RoleUser[];
  role_route?: RoleRoute[];
  name?: string;
  description?: string;
}