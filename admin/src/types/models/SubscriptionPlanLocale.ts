import { SubscriptionPlan } from './SubscriptionPlan';
import { Locale } from './Locale';

export type SubscriptionPlanLocale = {
  plan_id?: number;
  locale_id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  subscription_plan?: SubscriptionPlan;
  locale?: Locale;
}