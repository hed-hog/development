import { PaymentCoupon } from './PaymentCoupon';
import { Item } from './Item';

export type PaymentCouponItem = {
  id?: number;
  coupon_id: number;
  item_id: number;
  created_at?: string;
  updated_at?: string;
  payment_coupon?: PaymentCoupon;
  item?: Item;
}