import { Notification } from './Notification';
import { Quotation } from './Quotation';
import { Operation } from './Operation';
import { Simulation } from './Simulation';
import { GainerLoser } from './GainerLoser';
import { TopCoin } from './TopCoin';

export type Coin = {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  notification?: Notification[];
  quotation?: Quotation[];
  operation?: Operation[];
  simulation?: Simulation[];
  gainer_loser?: GainerLoser[];
  top_coin?: TopCoin[];
}