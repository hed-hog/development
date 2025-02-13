import { Multifactor } from './Multifactor';
import { PersonUser } from './PersonUser';
import { RoleUser } from './RoleUser';
import { SettingUser } from './SettingUser';
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
  person_user?: PersonUser[];
  role_user?: RoleUser[];
  setting_user?: SettingUser[];
  notification?: Notification[];
  operation?: Operation[];
  banking?: Banking[];
  simulation?: Simulation[];
}