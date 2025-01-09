import { Quotation } from './Quotation';
import { Simulation } from './Simulation';
import { TopCoin } from './TopCoin';
import { Operation } from './Operation';

export type Coin = {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  simulation?: Simulation[];
  top_coin?: TopCoin[];
  operation?: Operation[];
}