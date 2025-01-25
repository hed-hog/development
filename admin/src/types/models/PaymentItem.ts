import { Payment } from './Payment';
import { Item } from './Item';

export type PaymentItem = {
  id?: number;
  payment_id: number;
  item_id: number;
  unit_price?: any;
  delivered?: number;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
  payment?: Payment;
  item?: Item;
}