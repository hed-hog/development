import { DiscountType } from './DiscountType';
import { Payment } from './Payment';
import { PaymentCouponItem } from './PaymentCouponItem';

export type PaymentCoupon = {
  id?: number;
  discount_type_id: number;
  code: string;
  description?: string;
  value: string;
  active?: boolean;
  uses_limit?: number;
  uses_qtd?: number;
  starts_at: string;
  ends_at?: string;
  created_at?: string;
  updated_at?: string;
  discount_type?: DiscountType;
  payment?: Payment[];
  payment_coupon_item?: PaymentCouponItem[];
}