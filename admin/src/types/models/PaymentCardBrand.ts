import { Payment } from './Payment';

export type PaymentCardBrand = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment[];
}