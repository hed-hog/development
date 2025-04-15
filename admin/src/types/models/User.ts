import { Multifactor } from './Multifactor';
import { DashboardUser } from './DashboardUser';
import { SettingUser } from './SettingUser';
import { UserActivity } from './UserActivity';
import { UserCodeRecovery } from './UserCodeRecovery';
import { RoleUser } from './RoleUser';
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
  setting_user?: SettingUser[];
  user_activity?: UserActivity[];
  user_code_recovery?: UserCodeRecovery[];
  role_user?: RoleUser[];
  person_user?: PersonUser[];
}