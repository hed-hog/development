import { CountryLocale } from './CountryLocale';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  country_locale?: CountryLocale[];
  name?: string;
}