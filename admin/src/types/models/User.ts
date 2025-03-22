import { Multifactor } from './Multifactor';
import { UserActivity } from './UserActivity';
import { RoleUser } from './RoleUser';
import { PersonUser } from './PersonUser';
import { SettingUser } from './SettingUser';
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
  user_activity?: UserActivity[];
  role_user?: RoleUser[];
  person_user?: PersonUser[];
  setting_user?: SettingUser[];
  dashboard_user?: DashboardUser[];
}