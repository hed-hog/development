import { PaymentStatus } from './PaymentStatus';
import { Locale } from './Locale';

export type PaymentStatusLocale = {
  payment_status_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment_status?: PaymentStatus;
  locale?: Locale;
}