import { Coupon } from './Coupon';
import { Item } from './Item';

export type CouponItem = {
  coupon_id?: number;
  item_id?: number;
  created_at?: string;
  updated_at?: string;
  coupon?: Coupon;
  item?: Item;
}