import { PersonCustomTypes } from './PersonCustomTypes';
import { Locales } from './Locales';

export type PersonCustomTypeTranslations = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_custom_types?: PersonCustomTypes;
  locales?: Locales;
}