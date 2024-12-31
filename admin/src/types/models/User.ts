import { Multifactor } from './Multifactor';
import { SettingUser } from './SettingUser';
import { RoleUser } from './RoleUser';
import { Banking } from './Banking';
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
  role_user?: RoleUser[];
  banking?: Banking[];
  operation?: Operation[];
}