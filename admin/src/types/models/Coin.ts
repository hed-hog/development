import { GainerLoser } from './GainerLoser';
import { Simulation } from './Simulation';
import { Quotation } from './Quotation';
import { TopCoin } from './TopCoin';
import { Operation } from './Operation';
import { Notification } from './Notification';

export type Coin = {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  gainer_loser?: GainerLoser[];
  simulation?: Simulation[];
  quotation?: Quotation[];
  top_coin?: TopCoin[];
  operation?: Operation[];
  notification?: Notification[];
}