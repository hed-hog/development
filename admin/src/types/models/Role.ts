import { RoleLocale } from './RoleLocale';
import { RoleRoute } from './RoleRoute';
import { RoleMenu } from './RoleMenu';
import { RoleScreen } from './RoleScreen';
import { RoleUser } from './RoleUser';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_locale?: RoleLocale[];
  role_route?: RoleRoute[];
  role_menu?: RoleMenu[];
  role_screen?: RoleScreen[];
  role_user?: RoleUser[];
  name?: string;
  description?: string;
}