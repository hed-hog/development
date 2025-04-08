import { SubscriptionCancel } from './SubscriptionCancel';
import { SubscriptionCancelReason } from './SubscriptionCancelReason';

export type SubscriptionCancelReasonChoose = {
  id?: number;
  cancel_id: number;
  reason_id: number;
  created_at?: string;
  updated_at?: string;
  subscription_cancel?: SubscriptionCancel;
  subscription_cancel_reason?: SubscriptionCancelReason;
}