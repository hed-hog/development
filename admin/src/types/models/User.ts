import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { Notification } from './Notification';
import { RoleUser } from './RoleUser';
import { Banking } from './Banking';
import { Simulation } from './Simulation';
import { Operation } from './Operation';

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
  notification?: Notification[];
  role_user?: RoleUser[];
  banking?: Banking[];
  simulation?: Simulation[];
  operation?: Operation[];
}