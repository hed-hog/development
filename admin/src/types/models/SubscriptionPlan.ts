import { SubscriptionPlanDurationEnum } from './SubscriptionPlanDurationEnum';

export type SubscriptionPlan = {
  id?: number;
  slug: string;
  duration: SubscriptionPlanDurationEnum;
  created_at?: string;
  updated_at?: string;
}