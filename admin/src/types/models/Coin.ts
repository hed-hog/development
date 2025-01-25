import { Notification } from './Notification';
import { Quotation } from './Quotation';
import { Simulation } from './Simulation';
import { TopCoin } from './TopCoin';
import { Operation } from './Operation';
import { GainerLoser } from './GainerLoser';

export type Coin = {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  notification?: Notification[];
  quotation?: Quotation[];
  simulation?: Simulation[];
  top_coin?: TopCoin[];
  operation?: Operation[];
  gainer_loser?: GainerLoser[];
}