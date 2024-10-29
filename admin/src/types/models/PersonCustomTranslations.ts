import { PersonCustoms } from './PersonCustoms';
import { Locales } from './Locales';

export type PersonCustomTranslations = {
  custom_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_customs?: PersonCustoms;
  locales?: Locales;
}