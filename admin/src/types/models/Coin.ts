import { GainersLoser } from './GainersLoser';
import { TopVariation } from './TopVariation';
import { Quotation } from './Quotation';
import { TopCoin } from './TopCoin';
import { Simulation } from './Simulation';
import { Operation } from './Operation';

export type Coin = {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  gainers_loser?: GainersLoser[];
  top_variation?: TopVariation[];
  quotation?: Quotation[];
  top_coin?: TopCoin[];
  simulation?: Simulation[];
  operation?: Operation[];
}