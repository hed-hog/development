import { Roles } from './Roles';
import { Routes } from './Routes';

export type RoleRoutes = {
  role_id?: number;
  route_id?: number;
  created_at?: string;
  updated_at?: string;
  roles?: Roles;
  routes?: Routes;
}