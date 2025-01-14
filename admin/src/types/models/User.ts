import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { Banking } from './Banking';
import { RoleUser } from './RoleUser';
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
  banking?: Banking[];
  role_user?: RoleUser[];
  simulation?: Simulation[];
  operation?: Operation[];
}