import { PaymentMethodItem } from './PaymentMethodItem';
import { Payment } from './Payment';

export type PaymentMethod = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment_method_item?: PaymentMethodItem[];
  payment?: Payment[];
}