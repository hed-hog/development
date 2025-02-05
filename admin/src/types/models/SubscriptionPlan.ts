import { SubscriptionPlanDurationEnum } from './SubscriptionPlanDurationEnum';
import { Item } from './Item';
import { Subscription } from './Subscription';
import { SubscriptionPlanLocale } from './SubscriptionPlanLocale';
import { SubscriptionPlanGateway } from './SubscriptionPlanGateway';

export type SubscriptionPlan = {
  id?: number;
  slug: string;
  duration: SubscriptionPlanDurationEnum;
  item_id?: number;
  created_at?: string;
  updated_at?: string;
  item?: Item;
  subscription?: Subscription[];
  subscription_plan_locale?: SubscriptionPlanLocale[];
  subscription_plan_gateway?: SubscriptionPlanGateway[];
  name?: string;
  description?: string;
}