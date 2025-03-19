import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { PersonUser } from './PersonUser';
import { RoleUser } from './RoleUser';
import { DashboardUser } from './DashboardUser';

export type User = {
  id?: number;
  multifactor_id?: number;
  name: string;
  email: string;
  password: string;
  code?: string;
  created_at?: string;
  updated_at?: string;
  multifactor?: Multifactor;
  setting_user?: SettingUser[];
  person_user?: PersonUser[];
  role_user?: RoleUser[];
  dashboard_user?: DashboardUser[];
}