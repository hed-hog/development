import { DiscountType } from './DiscountType';
<<<<<<< HEAD
import { Payment } from './Payment';
import { PaymentCouponItem } from './PaymentCouponItem';
=======
import { PaymentCouponItem } from './PaymentCouponItem';
import { Payment } from './Payment';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

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
<<<<<<< HEAD
  payment?: Payment[];
  payment_coupon_item?: PaymentCouponItem[];
=======
  payment_coupon_item?: PaymentCouponItem[];
  payment?: Payment[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
}