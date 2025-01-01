import { Quotation } from './Quotation';

export type Bot = {
  id?: number;
  name: string;
  description?: string;
  cookies?: any;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
}