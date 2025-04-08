import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { PersonUser } from './PersonUser';
import { UserActivity } from './UserActivity';
import { DashboardUser } from './DashboardUser';
import { RoleUser } from './RoleUser';

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
  user_activity?: UserActivity[];
  dashboard_user?: DashboardUser[];
  role_user?: RoleUser[];
}