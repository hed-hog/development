import { SubscriptionCancelReasonLocale } from './SubscriptionCancelReasonLocale';
import { SubscriptionCancelReasonChoose } from './SubscriptionCancelReasonChoose';

export type SubscriptionCancelReason = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  subscription_cancel_reason_locale?: SubscriptionCancelReasonLocale[];
  subscription_cancel_reason_choose?: SubscriptionCancelReasonChoose[];
  name?: string;
}