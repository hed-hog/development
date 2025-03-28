import { Multifactor } from './Multifactor';
import { DashboardUser } from './DashboardUser';
import { UserActivity } from './UserActivity';
import { RoleUser } from './RoleUser';
import { SettingUser } from './SettingUser';

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
  user_activity?: UserActivity[];
  role_user?: RoleUser[];
  setting_user?: SettingUser[];
}