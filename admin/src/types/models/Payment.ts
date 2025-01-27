import { Person } from './Person';
import { Gateway } from './Gateway';
import { PaymentStatus } from './PaymentStatus';
import { PaymentMethod } from './PaymentMethod';
import { CardBrand } from './CardBrand';
import { Coupon } from './Coupon';
import { PaymentItem } from './PaymentItem';
import { PaymentValue } from './PaymentValue';

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
  gateway?: Gateway;
  payment_status?: PaymentStatus;
  payment_method?: PaymentMethod;
  card_brand?: CardBrand;
  coupon?: Coupon;
  payment_item?: PaymentItem[];
  payment_value?: PaymentValue[];
}