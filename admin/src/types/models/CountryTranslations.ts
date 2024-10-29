import { Countries } from './Countries';
import { Locales } from './Locales';

export type CountryTranslations = {
  country_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  countries?: Countries;
  locales?: Locales;
}