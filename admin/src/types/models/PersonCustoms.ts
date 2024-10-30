import { Persons } from './Persons';
import { PersonCustomTypes } from './PersonCustomTypes';
import { PersonCustomTranslations } from './PersonCustomTranslations';

export type PersonCustoms = {
  id?: number;
  person_id: number;
  type_id: number;
  value?: string;
  created_at?: string;
  updated_at?: string;
  persons?: Persons;
  person_custom_types?: PersonCustomTypes;
  person_custom_translations?: PersonCustomTranslations[];
  name?: string;
}