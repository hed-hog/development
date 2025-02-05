import { GainerLoser } from './GainerLoser';

export type CoinVariationType = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  gainer_loser?: GainerLoser[];
}