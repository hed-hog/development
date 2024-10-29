import { Users } from './Users';
import { Settings } from './Settings';

export type SettingUsers = {
  user_id?: number;
  setting_id?: number;
  value?: string;
  created_at?: string;
  updated_at?: string;
  users?: Users;
  settings?: Settings;
}