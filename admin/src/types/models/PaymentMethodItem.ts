import { PaymentMethod } from './PaymentMethod';
import { Item } from './Item';
import { DiscountType } from './DiscountType';

export type PaymentMethodItem = {
  id?: number;
  payment_method_id: number;
  item_id: number;
  discount_type_id: number;
  value?: any;
  created_at?: string;
  updated_at?: string;
  payment_method?: PaymentMethod;
  item?: Item;
  discount_type?: DiscountType;
}