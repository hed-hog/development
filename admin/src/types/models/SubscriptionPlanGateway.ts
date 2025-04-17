import { SubscriptionPlan } from './SubscriptionPlan';
import { PaymentGateway } from './PaymentGateway';

export type SubscriptionPlanGateway = {
  id?: number;
  plan_id: number;
  gateway_id: number;
  gateway_plan_id: string;
  created_at?: string;
  updated_at?: string;
  subscription_plan?: SubscriptionPlan;
  payment_gateway?: PaymentGateway;
}