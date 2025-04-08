import { RoleMenu } from './RoleMenu';
import { RoleLocale } from './RoleLocale';
import { RoleRoute } from './RoleRoute';
import { RoleScreen } from './RoleScreen';
import { RoleUser } from './RoleUser';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_menu?: RoleMenu[];
  role_locale?: RoleLocale[];
  role_route?: RoleRoute[];
  role_screen?: RoleScreen[];
  role_user?: RoleUser[];
  name?: string;
  description?: string;
}