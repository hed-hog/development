import { Payment } from './Payment';

export type PaymentValue = {
  id?: number;
  payment_id: number;
  name: string;
  value: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment;
}