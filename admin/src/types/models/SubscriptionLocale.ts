import { Subscription } from './Subscription';
import { Locale } from './Locale';

export type SubscriptionLocale = {
  subscription_id?: number;
  locale_id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  subscription?: Subscription;
  locale?: Locale;
}