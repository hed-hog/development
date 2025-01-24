import { RoleUser } from './RoleUser';
import { RoleLocale } from './RoleLocale';
import { RoleRoute } from './RoleRoute';
import { RoleMenu } from './RoleMenu';
import { RoleScreen } from './RoleScreen';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_user?: RoleUser[];
  role_locale?: RoleLocale[];
  role_route?: RoleRoute[];
  role_menu?: RoleMenu[];
  role_screen?: RoleScreen[];
  name?: string;
  description?: string;
}