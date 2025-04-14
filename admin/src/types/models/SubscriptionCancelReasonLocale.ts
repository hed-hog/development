import { SubscriptionCancelReason } from './SubscriptionCancelReason';
import { Locale } from './Locale';

export type SubscriptionCancelReasonLocale = {
  cancel_reason_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  subscription_cancel_reason?: SubscriptionCancelReason;
  locale?: Locale;
}