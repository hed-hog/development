import { Person } from './Person';
import { PaymentGateway } from './PaymentGateway';
import { PaymentStatus } from './PaymentStatus';
import { PaymentMethod } from './PaymentMethod';
import { PaymentCardBrand } from './PaymentCardBrand';
import { PaymentCoupon } from './PaymentCoupon';
<<<<<<< HEAD
import { PaymentItem } from './PaymentItem';
import { PaymentValue } from './PaymentValue';
import { PaymentNotification } from './PaymentNotification';
import { SubscriptionPayment } from './SubscriptionPayment';
=======
import { PaymentValue } from './PaymentValue';
import { PaymentNotification } from './PaymentNotification';
import { SubscriptionPayment } from './SubscriptionPayment';
import { PaymentItem } from './PaymentItem';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

export type Payment = {
  id?: number;
  slug: string;
  person_id?: number;
  gateway_id: number;
  amount: any;
  status_id: number;
  document?: string;
  payment_at?: string;
  currency: string;
  method_id?: number;
  brand_id?: number;
  installments?: number;
  delivered?: number;
  coupon_id?: number;
  discount?: any;
  created_at?: string;
  updated_at?: string;
  person?: Person;
  payment_gateway?: PaymentGateway;
  payment_status?: PaymentStatus;
  payment_method?: PaymentMethod;
  payment_card_brand?: PaymentCardBrand;
  payment_coupon?: PaymentCoupon;
<<<<<<< HEAD
  payment_item?: PaymentItem[];
  payment_value?: PaymentValue[];
  payment_notification?: PaymentNotification[];
  subscription_payment?: SubscriptionPayment[];
=======
  payment_value?: PaymentValue[];
  payment_notification?: PaymentNotification[];
  subscription_payment?: SubscriptionPayment[];
  payment_item?: PaymentItem[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
}