import { Operation } from './Operation';

export type TradeSignalType = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  operation?: Operation[];
}