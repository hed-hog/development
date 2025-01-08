import { Coin } from './Coin';
import { TopCoinType } from './TopCoinType';

export type TopCoin = {
  id?: number;
  coin_id: number;
  type_id: number;
  order: number;
  created_at?: string;
  updated_at?: string;
  coin?: Coin;
  top_coin_type?: TopCoinType;
}