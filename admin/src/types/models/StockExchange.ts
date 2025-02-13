import { Quotation } from './Quotation';
import { Operation } from './Operation';
import { Banking } from './Banking';
import { Simulation } from './Simulation';

export type StockExchange = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  operation?: Operation[];
  banking?: Banking[];
  simulation?: Simulation[];
}