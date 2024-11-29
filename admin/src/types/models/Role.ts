import { RoleMenu } from './RoleMenu';
import { RoleScreen } from './RoleScreen';
import { RoleUser } from './RoleUser';
import { RoleRoute } from './RoleRoute';
import { RoleLocale } from './RoleLocale';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_menu?: RoleMenu[];
  role_screen?: RoleScreen[];
  role_user?: RoleUser[];
  role_route?: RoleRoute[];
  role_locale?: RoleLocale[];
  name?: string;
  description?: string;
}