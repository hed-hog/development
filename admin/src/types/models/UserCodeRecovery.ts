import { User } from './User';

export type UserCodeRecovery = {
  id?: number;
  user_id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
}