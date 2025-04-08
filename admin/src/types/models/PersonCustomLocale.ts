import { PersonCustom } from './PersonCustom';
import { Locale } from './Locale';

export type PersonCustomLocale = {
  custom_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_custom?: PersonCustom;
  locale?: Locale;
}