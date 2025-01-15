import { TopVariation } from './TopVariation';

export type CoinVariationType = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  top_variation?: TopVariation[];
}