import { Country } from './Country';
import { Locale } from './Locale';

export type CountryLocale = {
  country_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  country?: Country;
  locale?: Locale;
}