import { RoleUser } from './RoleUser';
import { RoleRoute } from './RoleRoute';
import { RoleLocale } from './RoleLocale';
import { RoleScreen } from './RoleScreen';
import { RoleMenu } from './RoleMenu';

export type Role = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_user?: RoleUser[];
  role_route?: RoleRoute[];
  role_locale?: RoleLocale[];
  role_screen?: RoleScreen[];
  role_menu?: RoleMenu[];
  name?: string;
  description?: string;
}