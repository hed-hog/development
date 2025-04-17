<<<<<<< HEAD
import { Payment } from './Payment';
import { PaymentNotification } from './PaymentNotification';
=======
import { PaymentNotification } from './PaymentNotification';
import { Payment } from './Payment';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
import { SubscriptionPlanGateway } from './SubscriptionPlanGateway';

export type PaymentGateway = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  payment?: Payment[];
  payment_notification?: PaymentNotification[];
=======
  payment_notification?: PaymentNotification[];
  payment?: Payment[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
  subscription_plan_gateway?: SubscriptionPlanGateway[];
}