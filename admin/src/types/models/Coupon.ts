import { DiscountType } from './DiscountType';
import { CouponItem } from './CouponItem';

export type Coupon = {
  id?: number;
  discount_type_id: number;
  code: string;
  description: string;
  value: string;
  is_active?: number;
  uses_limit?: number;
  uses_qtd?: number;
  starts_at: string;
  ends_at?: string;
  created_at?: string;
  updated_at?: string;
  discount_type?: DiscountType;
  coupon_item?: CouponItem[];
}