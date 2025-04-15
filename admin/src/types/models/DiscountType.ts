import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentCoupon } from './PaymentCoupon';

export type DiscountType = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment_method_item?: PaymentMethodItem[];
  payment_coupon?: PaymentCoupon[];
}