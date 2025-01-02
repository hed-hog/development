import { Operation } from './Operation';
import { Quotation } from './Quotation';

export type StockExchange = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  operation?: Operation[];
  quotation?: Quotation[];
}