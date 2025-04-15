import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { UserActivity } from './UserActivity';
import { UserCodeRecovery } from './UserCodeRecovery';
import { PersonUser } from './PersonUser';
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
  user_activity?: UserActivity[];
  user_code_recovery?: UserCodeRecovery[];
  person_user?: PersonUser[];
  dashboard_user?: DashboardUser[];
  role_user?: RoleUser[];
}