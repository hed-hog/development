import { Quotation } from './Quotation';
import { Banking } from './Banking';
import { Simulation } from './Simulation';
import { Operation } from './Operation';

export type StockExchange = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  banking?: Banking[];
  simulation?: Simulation[];
  operation?: Operation[];
}