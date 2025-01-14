import { TopVariation } from './TopVariation';
import { Quotation } from './Quotation';
import { GainersLoser } from './GainersLoser';
import { Simulation } from './Simulation';
import { Operation } from './Operation';
import { TopCoin } from './TopCoin';

export type Coin = {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  top_variation?: TopVariation[];
  quotation?: Quotation[];
  gainers_loser?: GainersLoser[];
  simulation?: Simulation[];
  operation?: Operation[];
  top_coin?: TopCoin[];
}