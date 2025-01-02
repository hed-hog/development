import { Operation } from './Operation';
import { Quotation } from './Quotation';

export type Coin = {
  id?: number;
  name: string;
  code: string;
  created_at?: string;
  updated_at?: string;
  operation?: Operation[];
  quotation?: Quotation[];
}