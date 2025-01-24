import { Multifactor } from './Multifactor';
import { Banking } from './Banking';
import { SettingUser } from './SettingUser';
import { Simulation } from './Simulation';
import { RoleUser } from './RoleUser';
import { Operation } from './Operation';
import { Notification } from './Notification';

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
  banking?: Banking[];
  setting_user?: SettingUser[];
  simulation?: Simulation[];
  role_user?: RoleUser[];
  operation?: Operation[];
  notification?: Notification[];
}