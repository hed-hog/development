import { Payment } from './Payment';
import { SubscriptionPlanGateway } from './SubscriptionPlanGateway';
import { PaymentNotification } from './PaymentNotification';

export type PaymentGateway = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment[];
  subscription_plan_gateway?: SubscriptionPlanGateway[];
  payment_notification?: PaymentNotification[];
}