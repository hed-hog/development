import { Quotation } from './Quotation';

export type QuotationRequestType = {
  id?: number;
  name: string;
  description?: string;
  filters: any;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
}