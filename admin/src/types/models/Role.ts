import { RoleLocale } from './RoleLocale';
import { RoleScreen } from './RoleScreen';
import { RoleMenu } from './RoleMenu';
import { RoleUser } from './RoleUser';
import { RoleRoute } from './RoleRoute';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_locale?: RoleLocale[];
  role_screen?: RoleScreen[];
  role_menu?: RoleMenu[];
  role_user?: RoleUser[];
  role_route?: RoleRoute[];
  name?: string;
  description?: string;
}