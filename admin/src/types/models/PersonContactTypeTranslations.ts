import { PersonContactTypes } from './PersonContactTypes';
import { Locales } from './Locales';

export type PersonContactTypeTranslations = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_contact_types?: PersonContactTypes;
  locales?: Locales;
}