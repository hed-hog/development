import { Multifactor } from './Multifactor';
import { RoleUser } from './RoleUser';
import { SettingUser } from './SettingUser';
import { UserActivity } from './UserActivity';
import { DashboardUser } from './DashboardUser';
import { UserCodeRecovery } from './UserCodeRecovery';
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
  role_user?: RoleUser[];
  setting_user?: SettingUser[];
  user_activity?: UserActivity[];
  dashboard_user?: DashboardUser[];
  user_code_recovery?: UserCodeRecovery[];
  person_user?: PersonUser[];
}