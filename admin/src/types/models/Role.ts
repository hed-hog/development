import { RoleMenu } from './RoleMenu';
import { RoleRoute } from './RoleRoute';
import { RoleUser } from './RoleUser';
import { RoleLocale } from './RoleLocale';
import { RoleScreen } from './RoleScreen';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_menu?: RoleMenu[];
  role_route?: RoleRoute[];
  role_user?: RoleUser[];
  role_locale?: RoleLocale[];
  role_screen?: RoleScreen[];
  name?: string;
  description?: string;
}