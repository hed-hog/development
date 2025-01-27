import { Payment } from './Payment';
import { PaymentNotification } from './PaymentNotification';

export type Gateway = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment[];
  payment_notification?: PaymentNotification[];
}