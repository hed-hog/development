import { TopCoin } from './TopCoin';

export type TopCoinType = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  top_coin?: TopCoin[];
}