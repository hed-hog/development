import { RoleMenu } from './RoleMenu';
import { RoleRoute } from './RoleRoute';
import { RoleScreen } from './RoleScreen';
import { RoleUser } from './RoleUser';
import { RoleLocale } from './RoleLocale';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_menu?: RoleMenu[];
  role_route?: RoleRoute[];
  role_screen?: RoleScreen[];
  role_user?: RoleUser[];
  role_locale?: RoleLocale[];
  name?: string;
  description?: string;
}