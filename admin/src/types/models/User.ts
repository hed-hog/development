import { Multifactor } from './Multifactor';
import { DashboardUser } from './DashboardUser';
import { UserActivity } from './UserActivity';
import { SettingUser } from './SettingUser';
import { RoleUser } from './RoleUser';
import { UserCodeRecovery } from './UserCodeRecovery';

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
  setting_user?: SettingUser[];
  role_user?: RoleUser[];
  user_code_recovery?: UserCodeRecovery[];
}