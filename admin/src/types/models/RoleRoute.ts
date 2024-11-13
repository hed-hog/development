import { Role } from './Role';
import { Route } from './Route';

export type RoleRoute = {
  role_id?: number;
  route_id?: number;
  created_at?: string;
  updated_at?: string;
  role?: Role;
  route?: Route;
}