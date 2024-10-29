import { Roles } from './Roles';
import { Menus } from './Menus';

export type RoleMenus = {
  role_id?: number;
  menu_id?: number;
  created_at?: string;
  updated_at?: string;
  roles?: Roles;
  menus?: Menus;
}