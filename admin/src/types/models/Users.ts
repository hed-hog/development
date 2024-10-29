import { Multifactors } from './Multifactors';
import { SettingUsers } from './SettingUsers';
import { RoleUsers } from './RoleUsers';

export type Users = {
  id?: number;
  multifactor_id?: number;
  name: string;
  email: string;
  password: string;
  code?: string;
  created_at?: string;
  updated_at?: string;
  multifactors?: Multifactors;
  setting_users?: SettingUsers[];
  role_users?: RoleUsers[];
}