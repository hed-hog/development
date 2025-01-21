import { Indice } from './Indice';
import { Quotation } from './Quotation';

export type Bot = {
  id?: number;
  name: string;
  description?: string;
  cookies?: string;
  created_at?: string;
  updated_at?: string;
  indice?: Indice[];
  quotation?: Quotation[];
}