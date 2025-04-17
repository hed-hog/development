import { Person } from './Person';
import { PersonCustomType } from './PersonCustomType';
import { PersonCustomLocale } from './PersonCustomLocale';

export type PersonCustom = {
  id?: number;
  person_id: number;
  type_id: number;
  value?: string;
  created_at?: string;
  updated_at?: string;
  person?: Person;
  person_custom_type?: PersonCustomType;
  person_custom_locale?: PersonCustomLocale[];
  name?: string;
}