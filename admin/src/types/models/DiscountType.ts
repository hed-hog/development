import { PaymentCoupon } from './PaymentCoupon';
import { PaymentMethodItem } from './PaymentMethodItem';

export type DiscountType = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment_coupon?: PaymentCoupon[];
  payment_method_item?: PaymentMethodItem[];
}