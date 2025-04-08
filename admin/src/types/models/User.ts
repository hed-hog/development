import { Multifactor } from './Multifactor';
import { DashboardUser } from './DashboardUser';
import { RoleUser } from './RoleUser';
import { SettingUser } from './SettingUser';
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
  dashboard_user?: DashboardUser[];
  role_user?: RoleUser[];
  setting_user?: SettingUser[];
  user_activity?: UserActivity[];
  person_user?: PersonUser[];
}