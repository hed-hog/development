import { Locale } from './Locale';
import { TrendType } from './TrendType';

export type TrendTypeLocale = {
  locale_id?: number;
  type_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  locale?: Locale;
  trend_type?: TrendType;
}