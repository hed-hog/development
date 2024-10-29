import { Roles } from './Roles';
import { Users } from './Users';

export type RoleUsers = {
  role_id?: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  roles?: Roles;
  users?: Users;
}