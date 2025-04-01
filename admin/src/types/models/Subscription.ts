import { SubscriptionStatusEnum } from './SubscriptionStatusEnum';
import { SubscriptionPlan } from './SubscriptionPlan';
import { SubscriptionCancel } from './SubscriptionCancel';
import { SubscriptionValue } from './SubscriptionValue';
import { SubscriptionPerson } from './SubscriptionPerson';
import { SubscriptionPayment } from './SubscriptionPayment';

export type Subscription = {
  id?: number;
  plan_id: number;
  status: SubscriptionStatusEnum;
  limit?: number;
  created_at?: string;
  updated_at?: string;
  subscription_plan?: SubscriptionPlan;
  subscription_cancel?: SubscriptionCancel[];
  subscription_value?: SubscriptionValue[];
  subscription_person?: SubscriptionPerson[];
  subscription_payment?: SubscriptionPayment[];
}