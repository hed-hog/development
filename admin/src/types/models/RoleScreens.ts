import { Roles } from './Roles';
import { Screens } from './Screens';

export type RoleScreens = {
  role_id?: number;
  screen_id?: number;
  created_at?: string;
  updated_at?: string;
  roles?: Roles;
  screens?: Screens;
}