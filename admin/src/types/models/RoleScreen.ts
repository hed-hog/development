import { Role } from './Role';
import { Screen } from './Screen';

export type RoleScreen = {
  role_id?: number;
  screen_id?: number;
  created_at?: string;
  updated_at?: string;
  role?: Role;
  screen?: Screen;
}