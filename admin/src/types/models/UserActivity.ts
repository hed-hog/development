import { User } from './User';

export type UserActivity = {
  id?: number;
  user_id: number;
  ip: string;
  user_agent: string;
  message: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
}