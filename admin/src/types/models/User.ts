import { Multifactor } from './Multifactor';
import { UserCodeRecovery } from './UserCodeRecovery';
import { RoleUser } from './RoleUser';
import { DashboardUser } from './DashboardUser';
import { SettingUser } from './SettingUser';
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
  user_code_recovery?: UserCodeRecovery[];
  role_user?: RoleUser[];
  dashboard_user?: DashboardUser[];
  setting_user?: SettingUser[];
  user_activity?: UserActivity[];
}