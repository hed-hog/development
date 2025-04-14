import { Subscription } from './Subscription';

export type SubscriptionValue = {
  id?: number;
  subscription_id: number;
  name: string;
  value: string;
  created_at?: string;
  updated_at?: string;
  subscription?: Subscription;
}