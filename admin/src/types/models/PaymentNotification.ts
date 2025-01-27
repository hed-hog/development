import { PaymentGateway } from './PaymentGateway';
import { Payment } from './Payment';

export type PaymentNotification = {
  id?: number;
  gateway_id: number;
  payment_id?: number;
  log: string;
  created_at?: string;
  updated_at?: string;
  payment_gateway?: PaymentGateway;
  payment?: Payment;
}