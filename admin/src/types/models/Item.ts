import { SubscriptionPlan } from './SubscriptionPlan';
import { PaymentItem } from './PaymentItem';
import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentInstallmentItem } from './PaymentInstallmentItem';
import { PaymentCouponItem } from './PaymentCouponItem';

export type Item = {
  id?: number;
  slug: string;
  name: string;
  price: any;
  created_at?: string;
  updated_at?: string;
  subscription_plan?: SubscriptionPlan[];
  payment_item?: PaymentItem[];
  payment_method_item?: PaymentMethodItem[];
  payment_installment_item?: PaymentInstallmentItem[];
  payment_coupon_item?: PaymentCouponItem[];
}