import { PersonTypes } from './PersonTypes';
import { Locales } from './Locales';

export type PersonTypeTranslations = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_types?: PersonTypes;
  locales?: Locales;
}