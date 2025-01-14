import { Quotation } from './Quotation';
import { Simulation } from './Simulation';
import { Operation } from './Operation';
import { GainersLoser } from './GainersLoser';
import { TopCoin } from './TopCoin';

export type Coin = {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  simulation?: Simulation[];
  operation?: Operation[];
  gainers_loser?: GainersLoser[];
  top_coin?: TopCoin[];
}