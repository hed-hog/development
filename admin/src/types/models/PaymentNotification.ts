import { Gateway } from './Gateway';

export type PaymentNotification = {
  id?: number;
  gateway_id: number;
  log: string;
  created_at?: string;
  updated_at?: string;
  gateway?: Gateway;
}