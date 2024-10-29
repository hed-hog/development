import { RoleScreens } from './RoleScreens';
import { RoleUsers } from './RoleUsers';
import { RoleTranslations } from './RoleTranslations';
import { RoleRoutes } from './RoleRoutes';
import { RoleMenus } from './RoleMenus';

export type Roles = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  role_screens?: RoleScreens[];
  role_users?: RoleUsers[];
  role_translations?: RoleTranslations[];
  role_routes?: RoleRoutes[];
  role_menus?: RoleMenus[];
}