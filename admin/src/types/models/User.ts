import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { RoleUser } from './RoleUser';
import { Notification } from './Notification';
import { Operation } from './Operation';
import { Banking } from './Banking';
import { Simulation } from './Simulation';

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
  role_user?: RoleUser[];
  notification?: Notification[];
  operation?: Operation[];
  banking?: Banking[];
  simulation?: Simulation[];
}