import { SubscriptionStatusEnum } from './SubscriptionStatusEnum';
import { SubscriptionPlan } from './SubscriptionPlan';
import { SubscriptionPayment } from './SubscriptionPayment';
import { SubscriptionValue } from './SubscriptionValue';
import { SubscriptionPerson } from './SubscriptionPerson';
import { SubscriptionCancel } from './SubscriptionCancel';

export type Subscription = {
  id?: number;
  plan_id: number;
  status: SubscriptionStatusEnum;
  limit?: number;
  created_at?: string;
  updated_at?: string;
  subscription_plan?: SubscriptionPlan;
  subscription_payment?: SubscriptionPayment[];
  subscription_value?: SubscriptionValue[];
  subscription_person?: SubscriptionPerson[];
  subscription_cancel?: SubscriptionCancel[];
}