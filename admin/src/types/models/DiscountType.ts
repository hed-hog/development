<<<<<<< HEAD
import { PaymentCoupon } from './PaymentCoupon';
import { PaymentMethodItem } from './PaymentMethodItem';
=======
import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentCoupon } from './PaymentCoupon';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

export type DiscountType = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  payment_coupon?: PaymentCoupon[];
  payment_method_item?: PaymentMethodItem[];
=======
  payment_method_item?: PaymentMethodItem[];
  payment_coupon?: PaymentCoupon[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
}