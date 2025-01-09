import { Coin } from './Coin';

export type GainersLoser = {
  id?: number;
  coin_id: number;
  percent_change_24h: any;
  price: any;
  created_at?: string;
  updated_at?: string;
  coin?: Coin;
}