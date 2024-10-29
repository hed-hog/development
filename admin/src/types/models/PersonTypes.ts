import { PersonTypeTranslations } from './PersonTypeTranslations';
import { Persons } from './Persons';

export type PersonTypes = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_type_translations?: PersonTypeTranslations[];
  persons?: Persons[];
}