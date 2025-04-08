import { Multifactor } from './Multifactor';
import { DashboardUser } from './DashboardUser';
import { RoleUser } from './RoleUser';
import { UserActivity } from './UserActivity';
import { SettingUser } from './SettingUser';
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
  user_activity?: UserActivity[];
  setting_user?: SettingUser[];
  person_user?: PersonUser[];
}