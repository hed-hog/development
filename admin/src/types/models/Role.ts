import { RoleRoute } from './RoleRoute';
import { RoleScreen } from './RoleScreen';
import { RoleLocale } from './RoleLocale';
import { RoleUser } from './RoleUser';
import { RoleMenu } from './RoleMenu';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_route?: RoleRoute[];
  role_screen?: RoleScreen[];
  role_locale?: RoleLocale[];
  role_user?: RoleUser[];
  role_menu?: RoleMenu[];
  name?: string;
  description?: string;
}