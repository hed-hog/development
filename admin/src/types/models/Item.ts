import { CouponItem } from './CouponItem';
import { PaymentItem } from './PaymentItem';
import { PaymentMethodItem } from './PaymentMethodItem';

export type Item = {
  id?: number;
  slug: string;
  name: string;
  price: any;
  created_at?: string;
  updated_at?: string;
  coupon_item?: CouponItem[];
  payment_item?: PaymentItem[];
  payment_method_item?: PaymentMethodItem[];
}