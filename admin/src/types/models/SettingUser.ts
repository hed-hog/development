import { User } from './User';
import { Setting } from './Setting';

export type SettingUser = {
  user_id?: number;
  setting_id?: number;
  value?: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
  setting?: Setting;
}