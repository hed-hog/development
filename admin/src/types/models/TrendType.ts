import { Quotation } from './Quotation';
import { TrendTypeLocale } from './TrendTypeLocale';

export type TrendType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  quotation?: Quotation[];
  quotation_quotation_oscillators_rating_idTotrend_type?: Quotation[];
  quotation_quotation_technical_rating_idTotrend_type?: Quotation[];
  trend_type_locale?: TrendTypeLocale[];
  name?: string;
}