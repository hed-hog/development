import { PaymentStatusLocale } from './PaymentStatusLocale';
import { Payment } from './Payment';

export type PaymentStatus = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  payment_status_locale?: PaymentStatusLocale[];
  payment?: Payment[];
  name?: string;
}