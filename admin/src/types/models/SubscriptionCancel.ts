import { Subscription } from './Subscription';
import { Person } from './Person';
import { SubscriptionCancelReasonChoose } from './SubscriptionCancelReasonChoose';

export type SubscriptionCancel = {
  id?: number;
  subscription_id: number;
  person_id: number;
  comment?: string;
  created_at?: string;
  updated_at?: string;
  subscription?: Subscription;
  person?: Person;
  subscription_cancel_reason_choose?: SubscriptionCancelReasonChoose[];
}