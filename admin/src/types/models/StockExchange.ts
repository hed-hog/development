import { Quotation } from './Quotation';
import { Operation } from './Operation';

export type StockExchange = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  operation?: Operation[];
}