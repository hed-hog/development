import { Coupon } from './Coupon';
import { PaymentMethodItem } from './PaymentMethodItem';

export type DiscountType = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  coupon?: Coupon[];
  payment_method_item?: PaymentMethodItem[];
}