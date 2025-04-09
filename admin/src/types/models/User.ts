import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { UserActivity } from './UserActivity';
import { PersonUser } from './PersonUser';
import { UserM2fRecoveries } from './UserM2fRecoveries';
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
  person_user?: PersonUser[];
  user_m2f_recoveries?: UserM2fRecoveries[];
  dashboard_user?: DashboardUser[];
  role_user?: RoleUser[];
}