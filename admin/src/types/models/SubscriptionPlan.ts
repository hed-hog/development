import { SubscriptionPlanDurationEnum } from './SubscriptionPlanDurationEnum';
import { Item } from './Item';
import { SubscriptionPlanLocale } from './SubscriptionPlanLocale';
import { SubscriptionPlanGateway } from './SubscriptionPlanGateway';
import { Subscription } from './Subscription';

export type SubscriptionPlan = {
  id?: number;
  slug: string;
  duration: SubscriptionPlanDurationEnum;
  item_id?: number;
  limit?: number;
  created_at?: string;
  updated_at?: string;
  item?: Item;
  subscription_plan_locale?: SubscriptionPlanLocale[];
  subscription_plan_gateway?: SubscriptionPlanGateway[];
  subscription?: Subscription[];
  name?: string;
  description?: string;
}