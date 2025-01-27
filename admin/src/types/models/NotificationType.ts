import { Notification } from './Notification';

export type NotificationType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  notification?: Notification[];
}