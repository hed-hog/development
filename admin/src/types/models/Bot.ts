import { Quotation } from './Quotation';
import { Indice } from './Indice';

export type Bot = {
  id?: number;
  name: string;
  description?: string;
  cookies?: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  indice?: Indice[];
}