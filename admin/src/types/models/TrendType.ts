import { TrendTypeLocale } from './TrendTypeLocale';
import { Quotation } from './Quotation';

export type TrendType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  trend_type_locale?: TrendTypeLocale[];
  quotation?: Quotation[];
  quotation_quotation_oscillators_rating_idTotrend_type?: Quotation[];
  quotation_quotation_technical_rating_idTotrend_type?: Quotation[];
  name?: string;
}