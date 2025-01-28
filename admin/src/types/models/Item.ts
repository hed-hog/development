import { PaymentItem } from './PaymentItem';
import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentCouponItem } from './PaymentCouponItem';

export type Item = {
  id?: number;
  slug: string;
  name: string;
  price: any;
  created_at?: string;
  updated_at?: string;
  payment_item?: PaymentItem[];
  payment_method_item?: PaymentMethodItem[];
  payment_coupon_item?: PaymentCouponItem[];
}