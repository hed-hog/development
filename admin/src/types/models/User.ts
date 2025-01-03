import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { Operation } from './Operation';
import { Banking } from './Banking';
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
  operation?: Operation[];
  banking?: Banking[];
  role_user?: RoleUser[];
}