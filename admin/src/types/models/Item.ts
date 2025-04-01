import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentItem } from './PaymentItem';
import { PaymentInstallmentItem } from './PaymentInstallmentItem';
import { PaymentCouponItem } from './PaymentCouponItem';
import { SubscriptionPlan } from './SubscriptionPlan';

export type Item = {
  id?: number;
  slug: string;
  name: string;
  price: any;
  created_at?: string;
  updated_at?: string;
  payment_method_item?: PaymentMethodItem[];
  payment_item?: PaymentItem[];
  payment_installment_item?: PaymentInstallmentItem[];
  payment_coupon_item?: PaymentCouponItem[];
  subscription_plan?: SubscriptionPlan[];
}