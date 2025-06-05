import { Payment } from './Payment';
import { PaymentMethodItem } from './PaymentMethodItem';

export type PaymentMethod = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment[];
  payment_method_item?: PaymentMethodItem[];
}