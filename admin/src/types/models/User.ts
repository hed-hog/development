import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { RoleUser } from './RoleUser';
import { DashboardUser } from './DashboardUser';
import { UserActivity } from './UserActivity';
import { PersonUser } from './PersonUser';

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
  role_user?: RoleUser[];
  dashboard_user?: DashboardUser[];
  user_activity?: UserActivity[];
  person_user?: PersonUser[];
}