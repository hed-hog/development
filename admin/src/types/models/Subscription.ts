import { SubscriptionStatusEnum } from './SubscriptionStatusEnum';
import { SubscriptionPlan } from './SubscriptionPlan';
import { SubscriptionLocale } from './SubscriptionLocale';
import { SubscriptionValue } from './SubscriptionValue';
import { SubscriptionPerson } from './SubscriptionPerson';

export type Subscription = {
  id?: number;
  plan_id: number;
  status: SubscriptionStatusEnum;
  limit?: number;
  created_at?: string;
  updated_at?: string;
  subscription_plan?: SubscriptionPlan;
  subscription_locale?: SubscriptionLocale[];
  subscription_value?: SubscriptionValue[];
  subscription_person?: SubscriptionPerson[];
  name?: string;
  description?: string;
}