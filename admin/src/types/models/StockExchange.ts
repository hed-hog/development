import { Quotation } from './Quotation';
import { Simulation } from './Simulation';
import { Operation } from './Operation';

export type StockExchange = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  simulation?: Simulation[];
  operation?: Operation[];
}