import { DiscountType } from './DiscountType';
import { PaymentCouponItem } from './PaymentCouponItem';
import { Payment } from './Payment';

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
  payment_coupon_item?: PaymentCouponItem[];
  payment?: Payment[];
}