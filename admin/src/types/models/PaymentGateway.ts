import { PaymentNotification } from './PaymentNotification';
import { Payment } from './Payment';
import { SubscriptionPlanGateway } from './SubscriptionPlanGateway';

export type PaymentGateway = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment_notification?: PaymentNotification[];
  payment?: Payment[];
  subscription_plan_gateway?: SubscriptionPlanGateway[];
}