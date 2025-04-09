import { SubscriptionStatusEnum } from './SubscriptionStatusEnum';
import { SubscriptionPlan } from './SubscriptionPlan';
import { SubscriptionPerson } from './SubscriptionPerson';
import { SubscriptionPayment } from './SubscriptionPayment';
import { SubscriptionCancel } from './SubscriptionCancel';
import { SubscriptionValue } from './SubscriptionValue';

export type Subscription = {
  id?: number;
  plan_id: number;
  status: SubscriptionStatusEnum;
  limit?: number;
  created_at?: string;
  updated_at?: string;
  subscription_plan?: SubscriptionPlan;
  subscription_person?: SubscriptionPerson[];
  subscription_payment?: SubscriptionPayment[];
  subscription_cancel?: SubscriptionCancel[];
  subscription_value?: SubscriptionValue[];
}