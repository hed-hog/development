import { Multifactor } from './Multifactor';
import { RoleUser } from './RoleUser';
import { SettingUser } from './SettingUser';

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
  role_user?: RoleUser[];
  setting_user?: SettingUser[];
}