import { Multifactor } from './Multifactor';
import { Operation } from './Operation';
import { RoleUser } from './RoleUser';
import { SettingUser } from './SettingUser';
import { Banking } from './Banking';

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
  operation?: Operation[];
  role_user?: RoleUser[];
  setting_user?: SettingUser[];
  banking?: Banking[];
}