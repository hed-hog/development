import { Quotation } from './Quotation';

export type QuotationType = {
  id?: number;
  name: string;
  headers: any;
  filters: any;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
}