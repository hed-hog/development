import { PaymentCouponItem } from './PaymentCouponItem';
import { PaymentItem } from './PaymentItem';
import { SubscriptionPlan } from './SubscriptionPlan';
import { PaymentMethodItem } from './PaymentMethodItem';
import { PaymentInstallmentItem } from './PaymentInstallmentItem';

export type Item = {
  id?: number;
  slug: string;
  name: string;
  price: any;
  created_at?: string;
  updated_at?: string;
  payment_coupon_item?: PaymentCouponItem[];
  payment_item?: PaymentItem[];
  subscription_plan?: SubscriptionPlan[];
  payment_method_item?: PaymentMethodItem[];
  payment_installment_item?: PaymentInstallmentItem[];
}