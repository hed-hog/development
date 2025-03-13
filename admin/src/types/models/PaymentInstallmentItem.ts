import { Item } from './Item';

export type PaymentInstallmentItem = {
  id?: number;
  item_id: number;
  max_installments?: number;
  created_at?: string;
  updated_at?: string;
  item?: Item;
}