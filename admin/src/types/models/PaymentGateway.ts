import { Payment } from './Payment';
import { PaymentNotification } from './PaymentNotification';
import { SubscriptionPlanGateway } from './SubscriptionPlanGateway';

export type PaymentGateway = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment[];
  payment_notification?: PaymentNotification[];
  subscription_plan_gateway?: SubscriptionPlanGateway[];
}