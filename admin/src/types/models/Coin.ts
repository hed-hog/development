import { Quotation } from './Quotation';
import { Operation } from './Operation';

export type Coin = {
  id?: number;
  name: string;
  code: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  operation?: Operation[];
}