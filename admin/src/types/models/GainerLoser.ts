import { Coin } from './Coin';
import { CoinVariationType } from './CoinVariationType';

export type GainerLoser = {
  id?: number;
  coin_id: number;
  type_id: number;
  percent_change_24h: any;
  price: any;
  created_at?: string;
  updated_at?: string;
  coin?: Coin;
  coin_variation_type?: CoinVariationType;
}