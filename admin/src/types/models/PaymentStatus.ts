import { Payment } from './Payment';
import { PaymentStatusLocale } from './PaymentStatusLocale';

export type PaymentStatus = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment[];
  payment_status_locale?: PaymentStatusLocale[];
  name?: string;
}