import { SubscriptionCancelReasonChoose } from './SubscriptionCancelReasonChoose';
import { SubscriptionCancelReasonLocale } from './SubscriptionCancelReasonLocale';

export type SubscriptionCancelReason = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  subscription_cancel_reason_choose?: SubscriptionCancelReasonChoose[];
  subscription_cancel_reason_locale?: SubscriptionCancelReasonLocale[];
  name?: string;
}