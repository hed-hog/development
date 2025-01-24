import { Banking } from './Banking';
import { Simulation } from './Simulation';
import { Quotation } from './Quotation';
import { Operation } from './Operation';

export type StockExchange = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  banking?: Banking[];
  simulation?: Simulation[];
  quotation?: Quotation[];
  operation?: Operation[];
}