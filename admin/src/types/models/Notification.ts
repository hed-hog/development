import { NotificationType } from './NotificationType';
import { User } from './User';
import { Coin } from './Coin';

export type Notification = {
  id?: number;
  type_id: number;
  message: string;
  user_id?: number;
  coin_id?: number;
  created_at?: string;
  updated_at?: string;
  notification_type?: NotificationType;
  user?: User;
  coin?: Coin;
}