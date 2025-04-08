import { Multifactor } from './Multifactor';
import { DashboardUser } from './DashboardUser';
import { SettingUser } from './SettingUser';
import { RoleUser } from './RoleUser';
import { PersonUser } from './PersonUser';
import { UserActivity } from './UserActivity';

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
  dashboard_user?: DashboardUser[];
  setting_user?: SettingUser[];
  role_user?: RoleUser[];
  person_user?: PersonUser[];
  user_activity?: UserActivity[];
}