<<<<<<< HEAD
import { PaymentItem } from './PaymentItem';
import { SubscriptionPlan } from './SubscriptionPlan';
import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentInstallmentItem } from './PaymentInstallmentItem';
import { PaymentCouponItem } from './PaymentCouponItem';
=======
import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentInstallmentItem } from './PaymentInstallmentItem';
import { PaymentCouponItem } from './PaymentCouponItem';
import { SubscriptionPlan } from './SubscriptionPlan';
import { PaymentItem } from './PaymentItem';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

export type Item = {
  id?: number;
  slug: string;
  name: string;
  price: any;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  payment_item?: PaymentItem[];
  subscription_plan?: SubscriptionPlan[];
  payment_method_item?: PaymentMethodItem[];
  payment_installment_item?: PaymentInstallmentItem[];
  payment_coupon_item?: PaymentCouponItem[];
=======
  payment_method_item?: PaymentMethodItem[];
  payment_installment_item?: PaymentInstallmentItem[];
  payment_coupon_item?: PaymentCouponItem[];
  subscription_plan?: SubscriptionPlan[];
  payment_item?: PaymentItem[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
}